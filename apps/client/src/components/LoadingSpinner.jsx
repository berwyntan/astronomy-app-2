import { Circles } from 'react-loader-spinner'

export default function LoadingSpinner() {
    return (
        <div className='ml-30'>
            <Circles
            height="80"
            width="80"
            color="white"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            />
        </div>
    )
}