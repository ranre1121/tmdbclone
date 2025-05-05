import { Link } from "react-router-dom";

const months = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
};

function dateFormat(str){
    const dateArr = str.split('-')
    const month = Number(dateArr[1]);
    return(`${months[month]} ${dateArr[2]}, ${dateArr[0]}`)    
}


function ratingFormat(vote){
    const percentage = vote*10
    return Math.round(percentage)
}

function ratingDegree(vote){
    const percentage = ratingFormat(vote);
    let colors = [];
    if (percentage < 50){
        colors = ['#db2360','#571435']
    }else if (percentage >= 50 && percentage < 70)
        {
        colors = ['#d2d531','#423d0f']
    }else{
        colors = ['#21d07a','#204529']
    }
    return [percentage*3.6,colors]
}


const MovieCard = (props) => {
    return (
        <Link to = {`/${props.tvActive?'tv':'movies'}/${props.id}`} >
        <div>
            <img 
                src={`https://image.tmdb.org/t/p/w500/${props.poster_path}`} 
                className="w-[170px] relative h-[250px] min-w-[170px] rounded-lg shadow-lg z-10"
                alt="Movie Poster"

            />
            <div className='ml-3 -mt-3 mb-10 flex flex-col gap-1'>
            <div style={{
                background: `conic-gradient(${ratingDegree(props.vote_average)[1][0]} 0deg ${ratingDegree(props.vote_average)[0]}deg, ${ratingDegree(props.vote_average)[1][1]} ${ratingDegree(props.vote_average)[0]}deg 360deg)`
                }} className='h-8 w-8 rounded-full relative outline-2 outline-primary z-20 bg-primary flex justify-center items-center '>
                <div className='h-7 w-7 rounded-full justify-center align-center flex bg-primary'>
                <span className='flex items-center text-sm font-bold text-white z-20 relative'>
                {ratingFormat(props.vote_average)}
                <p className='text-[5px] font-normal -mt-1.5'>%</p>
                </span>
                </div>
            </div>
            <div>
                <p className='font-bold text-wrap hover:text-blue-400 cursor-pointer'>{props.title}</p>
                <p>{dateFormat(props.release_date)}</p>
            </div>
            </div>
        </div>
        </Link>
    );
};
export default MovieCard