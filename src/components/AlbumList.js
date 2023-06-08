import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from './Skeleton';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';
import AlbumsListItem from "./AlbumsListItem";

function AlbumList({user}){
    const {data, error, isFetching} = useFetchAlbumsQuery(user) 
    const [addAlbum, results ] = useAddAlbumMutation();
    console.log(data)

    const handleAddAlbum = () => {
        addAlbum(user);
    }

    let content;

    if(isFetching){
        content = <Skeleton className="h-10 w-full" times={3}/>
    }else if (error){
        content = <div>Error loading albums</div>
    }else{

        content = data.map(album => {
            return <AlbumsListItem key={album.id} album={album}/>
        })
    }

    return <div>
        <div className="m-2 flex flex-row items-center justify-between">
            <h3 className="text-lg font-bold">Album for {user.name}</h3> 
            <Button onClick={handleAddAlbum} loading={results.isLoading}>
                +Add Album
            </Button> 
        </div>
        <div>
            {content}
        </div>
    </div>
}

export default AlbumList;