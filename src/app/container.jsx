export default function Container(props) {
    let data=props.data;
    return (
        <div key={data._id} className="row w-[401px] h-[97px]  gap-[8px] rounded-[8px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] mt-1 mb-1 bg-white }" onClick={()=>props.handleContainer(data)}>
                <div className="row m-0">
                    <div className="col-12 m-0"> 
                        {data.title}
                    </div>    
                </div>
                <div className="row m-0"> 
                    <div className="col-8 m-0 truncate">
                        {data.desc?data.desc:"No Description"}
                    </div>
                    <div className="col-4 m-0">
                        {data.date.substring(0,9)}
                    </div>
                </div>
            </div>
  );}
