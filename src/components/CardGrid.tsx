export default function CardGrid()
{
    return(
        // <div className="card-grid">
        //     <div></div>
        //     <div></div>
        //     <div></div>
        //     <div></div>
        //     <div></div>
        //     <div></div>
        // </div>

        <div className="card-container">
            <div className="card">
                <div className="card-holder-temp">
                    <img src="/character/ch001001_full.png"></img>
                </div>
            </div>
            <br></br>
            <div className="card">
                <div className="card-holder-temp">
                    <img src="/character/ch001002_full.png"></img>
                </div>
            </div>
            <br></br>
            <div className="card">
                <div className="card-holder-temp">
                    <img src="/character/ch001003_full.png"></img>
                </div>
            </div>
            <br></br>
            <div className="card">
                <div className="card-holder-temp">
                    <img src="/character/ch009001_full.png"></img>
                </div>
            </div>
        </div>
    );
}
