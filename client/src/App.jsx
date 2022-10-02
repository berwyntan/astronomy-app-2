import { useState, useEffect, createContext } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Likes from './layout/Likes'
import Layout from './layout/Layout'
import Container from './components/Container'
import Albums from './layout/Albums'
import Album from './layout/Album'
import Search from './layout/Search'
import Shuffle from './layout/Shuffle'
import Latest from './layout/Latest'
import NotFound from './layout/NotFound'

import data from './data/sampleData'

import './App.css'

import lozad from 'lozad'
import axios from 'axios'
import dayjs from 'dayjs'
import { debounce } from 'lodash'
import Airtable from 'airtable'

export const DataContext = createContext();


Airtable.configure({ 
  apiKey: 'keyOqYhriP7UXVBht',
  endpointUrl: 'https://api.airtable.com',
});

let base = Airtable.base('appQerk9R1FpDeKEX');

function App() {
  
  // ------------------- STATES ------------------------------------------------
  // state to store the photos/title/text etc to be rendered
  const [itemData, setItemData] = useState([])   
  
  // to get todays date and date 10 days ago for the API
  const [dateStringForApi, setDateStringForApi] = useState({  
    // get date 10 days before today then format date in YYYY-MM-DD  
    startDateString: dayjs(dayjs().subtract(10, "day")).format("YYYY-MM-DD"),    
    endDateString: dayjs().format("YYYY-MM-DD"),    
    offset: 11,
  })
  const [likedItemData, setLikedItemData] = useState([])
  const [albumData, setAlbumData] = useState({
    form: "",
    albums: []
  }) 
  const [albumRoutes, setAlbumRoutes] = useState()
    
  // const [albumFormData, setAlbumFormData] = useState("")

  // if feedView is false, then gridView is active
  const [feedView, setFeedView] = useState(true)
  
  // if card grid single is true, show the selected single post in grid mode
  const [cardGridSingle, setCardGridSingle] = useState({
    selected: false, item: null})

  // store search date
  const [searchDate, setSearchDate] = useState()
  
  // store last interacted photo
  const [lastInteraction, setLastInteraction] = useState("")  

  // if isSearching is true, date picker will appear
  const [mode, setMode] = useState({
    latest: true,
    random: false,
    search: false,
    saves: false,
    albums: false,
    isSearching: false,
    isLoading: false,
    isAddingAlbum: false,
    isBookmarking: false,
    isAtAlbumsTab: false,
  })

  // to store data retrieved from airtable in string format
  const [airtableData, setAirtableData] = useState()

  // to dynamically change document title
  const [title, setTitle] = useState("Astronomy")
  
   
  // ------------------------------------ APIs -------------------------------------------

  // to provide the API with dates by using dayJS to calculate date subtracting
  const calculateDateForApi = () => {
    
    const offset = dateStringForApi.offset
    
    const endDateString = dayjs(dayjs().subtract(offset, "day")).format("YYYY-MM-DD")
    console.log("end date: ", endDateString);    
    
    const newOffset = offset + 10
    const newDate = dayjs().subtract(newOffset, "day")
    
    const startDateString = dayjs(newDate).format("YYYY-MM-DD")
    console.log("start date: ", startDateString);

    setDateStringForApi(prevData => {
      return ({
        ...prevData,
        startDateString: startDateString,
        endDateString: endDateString,    
        offset: newOffset + 1,    
      })
    })
  }

  // call API by date for latest and search mode
  const callApiByDate = () => {   
    
    setMode(prevState => ({
      ...prevState,
      isLoading: true,
    }))
    
    axios.get(`${import.meta.env.VITE_SERVER}/latest?start_date=${dateStringForApi.startDateString}&end_date=${dateStringForApi.endDateString}`)
    .then(function (response) {
      // handle success
      setItemData(prevData => (
        [
          ...prevData,
          ...response.data.reverse()
        ]
      ))
      setMode(prevState => ({
        ...prevState,
        isLoading: false,
      }))
      calculateDateForApi()
    })
    // axios.get(`https://api.nasa.gov/planetary/apod?api_key=CmaRrOqD96tV80CDIrjTmpawIrei2fv7hBEgOqH8&start_date=${dateStringForApi.startDateString}&end_date=${dateStringForApi.endDateString}`)
    // .then(function (response) {
    //   // handle success
    //   setItemData(prevData => (
    //     [
    //       ...prevData,
    //       ...response.data.reverse()
    //     ]
    //   ))
    //   setMode(prevState => ({
    //     ...prevState,
    //     isLoading: false,
    //   }))
    //   calculateDateForApi()
    // })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  }  

  // call API for random photos
  const callApiRandom = () => {
    setMode(prevState => ({
      ...prevState,
      isLoading: true,
    }))
    axios.get(`${import.meta.env.VITE_SERVER}/random`)
    .then(function (response) {
      // handle success
      console.log(response.data);
      setItemData(prevData => (
        [
          ...prevData,
          ...response.data
        ]
      ))
      setMode(prevState => ({
        ...prevState,
        isLoading: false,
      }))
    })
    // axios.get(`https://api.nasa.gov/planetary/apod?api_key=CmaRrOqD96tV80CDIrjTmpawIrei2fv7hBEgOqH8&count=16`)
    // .then(function (response) {
    //   // handle success
    //   console.log(response.data);
    //   setItemData(prevData => (
    //     [
    //       ...prevData,
    //       ...response.data
    //     ]
    //   ))
    //   setMode(prevState => ({
    //     ...prevState,
    //     isLoading: false,
    //   }))
    // })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
      // console.log('callApiRandom')
    });
  }

  // --------------------------- HANDLERS ------------------------------------------------
  // add or remove saves from likedItemData
  const handleLike = (item) => {
    
    const likedDates = likedItemData.map(item => item.date)
    
    likedDates.includes(item.date) ? 
      setLikedItemData(prevData => {
        let filterData = prevData;
        for (let i=0; i<filterData.length; i++) {
          if (filterData[i].date === item.date) {
            // console.log("remove like")
            filterData.splice(i, 1)
          }
        }
        return [...filterData]
      }) 
      // console.log(item)
      :
      setLikedItemData(prevData => ([item, ...prevData]))
      // console.log("add like")  
      if (mode.saves && mode.albums === false) {
        setItemData(likedItemData);
      }  
    // updateLikesToAirtable();  
  }

  // check if card is liked when rendering
  const checkLikedItems = (item) => {
    // setTimeout(updateLikesToAirtable, 150);
    // updateLikesToAirtable();    
    // const debounceUpdateLikesToAirtable = debounce(updateLikesToAirtable, 100);
    // debounceUpdateLikesToAirtable;
    // const coin = Math.floor(Math.random()*100);
    // if (coin > 80) {
    //   updateLikesToAirtable();
    // }

    let like = false
    for (let i=0; i<likedItemData.length; i++) {
      if (likedItemData[i]?.date === item?.date) {
        like = true
      }
    }
    return like
  }
  
  const handleFeedView = () => {
    setFeedView(true);
  }

  const handleGridView = () => {
    setFeedView(false);
  }

  const handleRandomView = () => {    
    // setRandomMode(true);
    setMode(prevState => ({
      ...prevState,
      latest: false,
      random: true,
      search: false,
      saves: false,
      albums: false,
      isAtAlbumsTab: false,
    }))
    setItemData([]);
    callApiRandom();
    setDateStringForApi({  
      // reset to initial values  
      startDateString: dayjs(dayjs().subtract(10, "day")).format("YYYY-MM-DD"),    
      endDateString: dayjs().format("YYYY-MM-DD"),    
      offset: 11,
    });    
  }

  const handleLatestView = () => {
    if (mode.random) {
      // setRandomMode(false);  
      setMode(prevState => ({
        ...prevState,
        latest: true,
        random: false,
        search: false,
        saves: false,
        albums: false,
        isAtAlbumsTab: false,
      }))  
      setItemData([]);
      callApiByDate();  
      setDateStringForApi({  
        // reset to initial values  
        startDateString: dayjs(dayjs().subtract(10, "day")).format("YYYY-MM-DD"),    
        endDateString: dayjs().format("YYYY-MM-DD"),    
        offset: 11,
    })
    }
    if (mode.search || mode.saves) {
      console.log("searching latest")
      setDateStringForApi({  
        // reset to initial values  
        startDateString: dayjs(dayjs().subtract(10, "day")).format("YYYY-MM-DD"),    
        endDateString: dayjs().format("YYYY-MM-DD"),    
        offset: 11,
      })
      setSearchDate();
      // closeDatePicker();
      // setRandomMode(false);
      // setSearchMode(false);
      setMode(prevState => ({
        ...prevState,
        latest: true,
        random: false,
        search: false,
        saves: false,
        albums: false,
        isAtAlbumsTab: false,
      }))
      setItemData([]);
      mode.saves && callApiByDate();
    }    
    if (mode.latest) {
      setItemData([]);
      callApiByDate();
    }
  }  

  
  // freeze grid view and render a modal of selection
  const loadGridSingleView = (item) => {

    document.body.style.overflow = 'hidden';
    
    setCardGridSingle(prevState => {
      return ({
        ...prevState,
        selected: !prevState.selected,
        item: item,
      })      
    })        
  }
  
  // unfreeze grid view and close modal
  const unloadGridSingleView = () => {

    document.body.style.overflow = 'visible';

    setCardGridSingle(prevState => {
      return ({
        ...prevState,
        selected: !prevState.selected,
        item: null
      })      
    })
  }

  // scroll window to top of body
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // toggle the date picker for searching
  const handleDatePicker = () => {
    // setIsSearching(prevState => !prevState)
    setMode(prevState => {
      return(
        {
          ...prevState,
          isSearching: !prevState.isSearching,
        }
      )      
    })
  }

  const closeDatePicker = debounce(handleDatePicker, 600)

  // get the date searched for, reset the cards, call Api and render searched card
  const handleDateSearch = date => {
    
    // set date string for API
    // console.log(dayjs(searchDate).format("YYYY-MM-DD"))
    const searchDateInStringFormat = dayjs(date).format("YYYY-MM-DD");
    console.log(searchDateInStringFormat);
    const searchDateInDayjsFormat = dayjs(searchDateInStringFormat);
    const today = dayjs();
    const diff = today.diff(searchDateInDayjsFormat, 'day');
    console.log(diff);
    
    setDateStringForApi({
      startDateString: dayjs(dayjs(date).subtract(10, "day")).format("YYYY-MM-DD"),    
      endDateString: dayjs(date).format("YYYY-MM-DD"),    
      offset: diff + 11,
    })
    
    // call API by date
    // callApiByDate();
    setSearchDate(date);
    closeDatePicker();
    // setRandomMode(false);
    // setSearchMode(true);
    setMode(prevState => ({
      ...prevState,
      latest: false,
      random: false,
      search: true,
      saves: false,
      albums: false,
      isAtAlbumsTab: false,
    }))
    setItemData([]);
    
  }

  // gets the id of last interacted card element so window can scroll to element when switching view
  const handleInteraction = id => {
    
    setLastInteraction(id);
  }  

  // render likes
  const handleLikeMode = () => {
    
    setMode(prevState => ({
      ...prevState,
      latest: false,
      random: false,
      search: false,
      saves: true,
      albums: false,
      isLoading: false,
      isAtAlbumsTab: false,
    }))

    setDateStringForApi({  
      // reset to initial values  
      startDateString: dayjs(dayjs().subtract(10, "day")).format("YYYY-MM-DD"),    
      endDateString: dayjs().format("YYYY-MM-DD"),    
      offset: 11,
    })

    setItemData(likedItemData)
  }

  // toggle album tab on navbar only NOT for viewing individual albums
  const handleAlbumTab = () => {
    setMode(prevState => ({
      ...prevState,
      latest: false,
      random: false,
      search: false,
      saves: true,
      albums: false,
      isAtAlbumsTab: true,
    }))
    setDateStringForApi({  
      // reset to initial values  
      startDateString: dayjs(dayjs().subtract(10, "day")).format("YYYY-MM-DD"),    
      endDateString: dayjs().format("YYYY-MM-DD"),    
      offset: 11,
    })
  }

  // add new album
  const handleAddAlbumForm = () => {
    setMode(prevState => ({
      ...prevState,
      isAddingAlbum: !prevState.isAddingAlbum,
    }))
  }

  // onChange form listener
  const updateAlbumForm = event => {
    const albumName = event.target.value;
    // console.log(albumName);

    const allRoutesArray = albumData?.albums?.map(album => album.route);
    // console.log("ALL ROUTES")
    // console.log(allRoutesArray);
    setAlbumRoutes(allRoutesArray);
    
    setAlbumData(prevData => ({
      ...prevData,
      form: albumName
    }));  
  }

  // add new album to album data
  const handleAddNewAlbum = event => {
    event.preventDefault();

    if (albumData.form !== "") {
      let route = albumData.form.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
      // check for duplicate routes
      if (albumRoutes.includes(route)) {
        console.log("duplicate")
        route = `${route}${Math.floor(Math.random()*1000000)}`
      }

      const newAlbum = {
        name: albumData.form,
        route: route,
        data: [],
      };
      const updatedData = albumData.albums.map(d => {return({...d})});
      // console.log(updatedData);
      updatedData.push(newAlbum);
      console.log(updatedData);
      setAlbumData(prevData => ({
        ...prevData,
        form: "",
        albums: updatedData
      }))
    }
    handleAddAlbumForm()
  }

  // check if photo is stored in albums
  const checkAlbumData = item => {

    // const coin = Math.floor(Math.random()*100);
    // if (coin > 85) {
    //   updateAlbumsToAirtable();
    // }

    let bookmark = false;
    const numOfAlbums = albumData.albums.length;
    for (let i=0; i<numOfAlbums; i++) {
      const album = albumData.albums[i].data;
      const albumLength = albumData.albums[i].data.length;
      for (let j=0; j<albumLength; j++) {
        if (album[j]?.date === item?.date) {
          bookmark = true
        }
      }      
    }
    return bookmark;
  }

  // switch mode to albums and saves NOTE: WHEN VIEWING INDIVIDUAL ALBUMS ONLY
  const handleAlbumsMode = album => {
    setItemData(album)
    setMode(prevState => ({
      ...prevState,
      latest: false,
      random: false,
      search: false,
      saves: true,
      albums: true,
      isLoading: false,
      isAtAlbumsTab: true,
    }))
    setDateStringForApi({  
      // reset to initial values  
      startDateString: dayjs(dayjs().subtract(10, "day")).format("YYYY-MM-DD"),    
      endDateString: dayjs().format("YYYY-MM-DD"),    
      offset: 11,
    })
  }

  // add/remove item from album
  const handleBookmark = (album, item, found) => {
    
    // if (mode.saves) {
    //   setItemData([])
      // setItemData(changedAlbumData)
    // }
    let changedAlbum = album;
    let changedAlbumData;
    
    // console.log(album)    
    // console.log(album.name)
    // console.log(item)
    // console.log(found)

    // map albumData.albums but remove album to edit
    const unchangedAlbums = albumData.albums.filter(alb => {
      if (alb.name !== album.name) {
        return alb
      }
    });
    console.log(unchangedAlbums);

    if (item.date === found?.date) {
      console.log("remove item");
      
      // map album without item
      changedAlbumData = album.data.filter(i => {
        if (i.date !== item.date) {
          return i
        }
      })
      console.log(changedAlbumData);
      changedAlbum.data = changedAlbumData;
      console.log(changedAlbum);
      // unshift album to mapped total albums
      unchangedAlbums.unshift(changedAlbum);
      console.log(unchangedAlbums)
      setAlbumData(prevData => ({
        ...prevData,
        albums: unchangedAlbums,
      }))   
      if (mode.saves && mode.albums) {
        // setItemData([])
        setItemData(changedAlbumData)
      }
      
    } else {
      console.log("add item");
      
      // add item to album
      changedAlbumData = album.data;
      changedAlbumData.unshift(item);
      // console.log(changedAlbumData);

      changedAlbum.data = changedAlbumData;
      // console.log(changedAlbum);
      // unshift album to mapped total albums
      unchangedAlbums.unshift(changedAlbum);
      console.log(unchangedAlbums)
      setAlbumData(prevData => ({
        ...prevData,
        albums: unchangedAlbums,
      }))         
    }    
  }

  // to update rename or delete albums
  const updateAlbumData = updatedData => {
    setAlbumData(prevData => ({
      ...prevData,
      albums: updatedData
    }))

    // const coin = Math.floor(Math.random()*100);
    // if (coin > 85) {
    // updateAlbumsToAirtable();
    // }
  }

  // update state with STRING data from airtable 
  const updateLikesFromAirtable = () => {
    setLikedItemData(prevData => {
      const check = airtableData?.likedItemData;
      let likes;
      let checkedLikes;
      
      if (check && airtableData.likedItemData !== "") {          
        likes = JSON.parse(airtableData.likedItemData);
        // console.log(likes);   
        console.log("updating likes from AT: string to JSON")

        checkedLikes = likes.filter(like => {
          if (checkLikedItems(like) === false) {
            return like;}          
          })

        // console.log(checkedLikes)
        
        return ([
          ...prevData,
          ...checkedLikes
        ]);        
              
      } else return ([...prevData])      
    })
  }

  // convert like data to string, upload to Airtable
  const updateLikesToAirtable = () => {
    const likes = likedItemData;
    if (likes.length > 0) {
      const updatedLikes = JSON.stringify(likes);
    console.log("updating likes to AT");
    base('State Name').update([
      {
        "id": "recNOmMqSacjOAej7",
        "fields": {
          "Name": "likedItemData",
          "JSONstring": updatedLikes,
        }
      },
    ], function(err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function(record) {
        // console.log(record.get('Name'));
      });
    });
    }    
  }

  // update state with STRING data from airtable 
  const updateAlbumsFromAirtable = () => {
    
    setAlbumData(prevData => {
      const check = airtableData?.albumData;
      let albums;
      let checkedAlbums;
      // check if defined
      if (check && airtableData.albumData !== "") {          
        albums = JSON.parse(airtableData.albumData);        
        console.log("updating albums from AT: string to JSON")
        console.log(albums);  
        // check if album route already exists
        const albumRoutesArray = prevData.albums.map(album => album.route);
        // console.log(albumRoutesArray);

        // filter albums which exists
        checkedAlbums = albums.filter(album => {
            if (albumRoutesArray.includes(album.route)) {
              return false
            } else return true                     
          })

        // console.log(...prevData.albums)
        
        return ({
          ...prevData,
          albums: [
            ...prevData.albums,
            ...checkedAlbums
          ]
        });        
              
      } else return ({...prevData})      
    })
  }

  // convert album data to string, upload to Airtable
  const updateAlbumsToAirtable = () => {
    const albums = albumData.albums;
    if (albums.length > 0) {
      const updatedAlbums = JSON.stringify(albums);
    console.log("updating albums to AT");
    base('State Name').update([
      {
        "id": "rec9DnEWJXQKzp77l",
        "fields": {
          "Name": "albumData",
          "JSONstring": updatedAlbums,
        }
      },
    ], function(err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function(record) {
        // console.log(record.get('Name'));
      });
    });
    }    
  }

  const handleTitle = (title) => {
    setTitle(title);
  }

  // --------------------------- USE EFFECTS --------------------------------------------- 
  // first API call on app load
  // useEffect(() => {callApiRandom()}, [])
  // useEffect(() => {callApiByDate()}, [searchDate]) 
  // useEffect(() => setItemData(data), [])

  // set title of document on page change
  useEffect(() => {document.title = title}, [title])

  // upload data to airtable
  useEffect(() => updateLikesToAirtable(), [likedItemData])
  useEffect(() => updateAlbumsToAirtable(), [albumData])

  // set states for likes and albums when airtable string data is received
  useEffect(() => {
    const delay = () => {
      updateLikesFromAirtable(); updateAlbumsFromAirtable()
    };
    setTimeout(delay, 0);  

    return clearTimeout(delay);
  }, [airtableData])
  
  // lazy load images listener
  useEffect(() => {
    const observer = lozad('.lozad', {
      rootMargin: '600px 0px', // syntax similar to that of CSS Margin
      threshold: 0.1, // ratio of element convergence
      enableAutoReload: true // it will reload the new image when validating attributes changes
    });
    observer.observe();
  })

  // scroll to bottom event listener
  useEffect(() => {
    const handleScroll = event => {
      // console.log('Math.ceil(document.documentElement.scrollTop)', Math.ceil(document.documentElement.scrollTop));
      // console.log('window.innerHeight', window.innerHeight);  
      // console.log('window.pageYOffset', window.pageYOffset);    
      // console.log('document.documentElement.offsetHeight', document.documentElement.offsetHeight);
      // const position = document.documentElement.scrollTop;
      
      if (mode.saves === false) {
        if (Math.floor(document.documentElement.scrollTop) + window.innerHeight === document.documentElement.offsetHeight) {
          console.log("infinite scroll v1")     
             
          mode.random && mode.isLoading === false ? callApiRandom() : callApiByDate()
          console.log(itemData);
          return
        } else if (Math.ceil(document.documentElement.scrollTop) + window.innerHeight === document.documentElement.offsetHeight) {
          console.log("infinite scroll v2")     
             
          mode.random && mode.isLoading === false ? callApiRandom() : callApiByDate()
          console.log(itemData);
          return
        } else if (document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight) {
          console.log("infinite scroll v3")
          
          mode.random && mode.isLoading === false ? callApiRandom() : callApiByDate()
          console.log(itemData);
          return
        }}  
      }

    const debounceHandleScroll = debounce(handleScroll, 800)

    // window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', debounceHandleScroll);

    return () => {
      // window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', debounceHandleScroll);
    };
  })

  // to scroll window to last interacted element
  useEffect(() => {    
    document.getElementById(lastInteraction)?.scrollIntoView();
    console.log("scroll to: ");
    console.log(lastInteraction);   
  }, [feedView])


  // call Airtable API on load to get saved like and album data
  useEffect(() => {       
    
    base('State Name').select({
      // Selecting the first 2 records in Grid view:
      maxRecords: 2,
      view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        // console.log(records)
        
        records.forEach(function(record) {
          const fieldOne = record?.get('Name');
          // console.log(fieldOne);
          // console.log('Retrieved', record.get('Name'));
          const fieldTwo = record?.get('JSONstring');
          // console.log(fieldTwo)
          // console.log('Retrieved', record.get('JSONstring'));
          if (fieldOne === "likedItemData") {
            if (fieldTwo) {
              console.log("get liked data");
              setAirtableData(prevData => ({
                ...prevData,
                likedItemData: fieldTwo
              }))
            }           
          } else if (fieldOne === "albumData") {
            if (fieldTwo) {
              console.log("get album data")
              setAirtableData(prevData => ({
                ...prevData,
                albumData: fieldTwo
              }))
            }          
          } else {
            setAirtableData(prevData => ({
              ...prevData,
            }))
          }
        });
  
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        try {
          fetchNextPage();
        } catch { return; }
  
    }, function done(err) {
        if (err) { console.error(err); return; }
                
    });
    
  }, [])

  // --------------------------------------- CONSOLE LOG ----------------------------
  // console.log(itemData)
  // console.log("saves: ")
  // console.log(likedItemData)
  // console.log(cardGridSingle)
  // console.log(dateStringForApi)
  // console.log(lastInteraction)
  
  // const album1 = `${albumData.albums[0].route}` || ""
  // console.log(albumData)
  // console.log(import.meta.env.VITE_NASA_API)
  // const x = albumData.albums
  // const y = JSON.stringify(x)
  // console.log(y)
  
  //  -------------------------------------- DATA FOR CONTEXT ------------------------------
  
  const data = {
    itemData,
    feedView,
    mode,
    cardGridSingle,
    handleLike,
    checkLikedItems,
    loadGridSingleView,
    unloadGridSingleView,
    handleInteraction,
    handleScrollToTop,
    handleDatePicker,
    handleDateSearch,
    searchDate,
    handleRandomView,
    handleLatestView,
    handleFeedView,
    handleGridView,
    handleLikeMode,
    likedItemData,
    albumData,
    handleAddAlbumForm,
    updateAlbumForm,
    handleAddNewAlbum,
    checkAlbumData,
    handleAlbumsMode,
    handleBookmark,
    updateAlbumData,
    handleAlbumTab,
    updateAlbumsToAirtable,
    updateLikesFromAirtable,
    updateAlbumsFromAirtable,
    callApiByDate,
    callApiRandom,
    handleTitle,
  }

  
  return (
    <DataContext.Provider value={data}>
    <BrowserRouter>
      <Routes> 
        <Route path="/shuffle" element={<Layout />}>
          <Route index element={<Shuffle />} />
        </Route> 
        <Route path="/search" element={<Layout />}>
          <Route index element={<Search />} />
        </Route> 
        <Route path="/likes" element={<Layout />}>
          <Route index element={<Likes />} />
        </Route> 
        <Route path="/albums" element={<Layout />}>
          <Route index element={<Albums />} />
          <Route path=":albumroute" element={<Album />} />
        </Route>   
        <Route path="/latest" element={<Layout />}>
          <Route index element={<Latest />} />
        </Route>        
        <Route path="/" element={<Layout />}>
          <Route index element={<Latest />} />
          <Route path="*" element={<NotFound />} />
        </Route>        
        {/* <Route path="*" element={<Layout />}>
          <NotFound />
        </Route> */}
      </Routes>
    </BrowserRouter>
    </DataContext.Provider>
  )
}

export default App
