import { useEffect, useState, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Skeleton from "./Skeleton";
import  Button from './Button';
import useThunk from "../hooks/useThunk";
import UserListItem from "./UsersListItem";



function UsersList(){

    // const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    // const [loadingUsersError, setLoadingUsersError] = useState(null); 
    // const [isCreatingUser, setIsCreatingUser] = useState(false);
    // const [creatingUserError, setCreatingUserError] = useState(null);

    // useEffect(() => {
    //     setIsLoadingUsers(true);
    //     dispatch(fetchUsers())
    //         .unwrap()
    //         .catch((err) => setLoadingUsersError(err))
    //         .finally(() => setIsLoadingUsers(false))
    // }, [dispatch])

    // const handleUserAdd = () => {
    //     setIsCreatingUser(true);
    //     dispatch(addUser())
    //         .unwrap()
    //         .catch(err => setCreatingUserError(err))
    //         .finally(() => setIsCreatingUser(false))
    // }

    const {isLoading, data, error} = useSelector((state) => {
        return state.users;
    })



    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
    const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

    useEffect(() => {
        doFetchUsers()
    }, [doFetchUsers])

    const handleUserAdd = () => {
        doCreateUser();
    }


    let content;
    if(isLoadingUsers){
        content = <Skeleton times={6} className="h-10 w-full"/>
    }
    else if(loadingUsersError){
        content = <div>Error Fetching data</div>
    }else{
        content = data.map((user) => {
            return <UserListItem key={user.id} user={user}/>
        });
    }


    return <div>
        <div className="flex flex-row justify-between item-center m-3">
            <h1 className="m-2 text-xl">Users</h1>
            {
                <Button loading={isCreatingUser} onClick={handleUserAdd}>+ Add User</Button>
            }
            {creatingUserError && "Error creating User..."}
            </div>
        {content}
    </div>;
}

export default UsersList;

