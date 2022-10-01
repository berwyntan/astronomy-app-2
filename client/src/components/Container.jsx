import { useContext } from 'react'
import { DataContext } from '../App'

import LoadingSpinner from "./LoadingSpinner"
import CardGridSelection from "./CardGridSelection"
import Card from "./Card"

export default function Container() {

  const dataContext = useContext(DataContext)

  // destructure dataContext
  const { itemData, feedView, mode,
    cardGridSingle, handleLike, checkLikedItems,
    loadGridSingleView, handleInteraction,
    checkAlbumData, updateLikesFromAirtable, updateAlbumsFromAirtable
  } = dataContext || {};

  // map cards
  const cards = itemData.map((item, index) => {
    if (item.media_type === "image") {
      
      const like = checkLikedItems(item)
      const bookmark = checkAlbumData(item)
      // const isBookmarking = mode.isBookmarking

      return (
        <Card
          item={item}
          like={like}
          handleLike={handleLike}
          feedView={feedView}
          loadGridSingleView={loadGridSingleView}
          handleInteraction={handleInteraction}
          bookmark={bookmark}
          mode={mode}
          key={index}
        />
      )
    }
  })

    
  return (
      // <div className="bg-neutral-900 text-slate-50">
      <div className="p-8">
        {feedView ? 
        // feed view
        <div className='mt-16 ml-5 md:ml-14'>         
          {cards}
          {mode.isLoading && <LoadingSpinner />}
        </div> :
        // grid view
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
          xl:grid-cols-5 gap-4 justify-center mt-16 container mx-auto'>
          {cards}
          {mode.isLoading && <LoadingSpinner />}
        </div>
        }
        
        {
          cardGridSingle.selected && 
          <CardGridSelection />
        }
      
      </div>
  )
}