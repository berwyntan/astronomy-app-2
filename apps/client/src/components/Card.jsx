import CardPost from './CardPost'
import CardGrid from './CardGrid'

export default function Card({ 
    item, handleLike, like, feedView, loadGridSingleView, 
    handleInteraction, bookmark, mode,
}) {
    
    
    return (
        <>
            { feedView ? 
            
            <CardPost 
                item={item}
                handleLike={handleLike}
                like={like}
                handleInteraction={handleInteraction}
                bookmark={bookmark}
                mode={mode}
                />
            :
        
            <CardGrid 
                item={item}
                // handleLike={handleLike}
                // like={like}
                loadGridSingleView={loadGridSingleView}
                handleInteraction={handleInteraction}
                
            />
            
            }
        </>
        
        
        
    )
    
}