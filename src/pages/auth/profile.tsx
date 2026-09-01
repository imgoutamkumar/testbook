import { useLazyGetUserQuery } from '@/redux/services/authApi'
import { useEffect } from 'react'

const Profile = () => {
    // const { id } = useParams<{ id: string }>()
    const [getUser, { isLoading, error, data: userData }] = useLazyGetUserQuery()

    useEffect(() => {
        // Just call it empty!
        getUser(); 
    }, [getUser]);

    return (
        <div>
            {isLoading ? (
                <p>Loading user data...</p>
            ) : error ? (
                <p>Error loading user data: {error.toString()}</p>
            ) : (
                <p>User data: {JSON.stringify(userData)}</p>
            )}
        </div>
    )
}

export default Profile
