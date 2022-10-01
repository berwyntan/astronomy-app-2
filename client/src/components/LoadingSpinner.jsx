import { RevolvingDot } from 'react-loader-spinner'

export default function LoadingSpinner() {
    return (
        <div className='ml-30'>
            <RevolvingDot
            height="100"
            width="100"
            radius="6"
            color="black"
            secondaryColor=''
            ariaLabel="revolving-dot-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            />
        </div>
    )
}