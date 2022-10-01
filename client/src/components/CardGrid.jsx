
export default function CardGrid(
    { item, loadGridSingleView, handleInteraction }
) {
    
    return (
        <div className="" id={`${item?.date}`} onMouseOver={() => handleInteraction(item?.date)}>
            
            <img 
                data-src={item?.url} 
                className="rounded-lg object-cover h-60 mx-auto cursor-pointer lozad"
                onClick={() => loadGridSingleView(item)}
            />   
            <h2 className="font-semibold line-clamp-2 text-center">{item.title}</h2>         
        </div>
        
    )
    
}