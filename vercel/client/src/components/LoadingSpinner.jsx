import { Circles } from 'react-loader-spinner'

export default function LoadingSpinner() {
    return (
        <>
        <span className='ml-30'>
            <Circles
            height="80"
            width="80"
            color="white"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            />
        </span>
        <span className='ml-30'>
            <Circles
            height="80"
            width="80"
            color="#2A303C"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            />
        </span>
        </>
    )
}