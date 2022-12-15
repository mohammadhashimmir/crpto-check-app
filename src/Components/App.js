import React ,{useState ,useEffect} from "react";
import axios from "axios";
import "./App.css";

const App=()=>{
    const [list, setList]=useState([]);
    const [text, setText]=useState("");

useEffect(()=>{
    const first=async()=>{
       const res= await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
       setList(res.data); 
    };
first();
},[]);
const onInputChange=(e)=>{
    setText(e.target.value);
};
const searchedList=list.filter( search=>
    search.name.toLowerCase().includes(text.toLowerCase())
);

const renderedList=searchedList.map((coin)=>{
    return (
        <div className="ui horizontal segments lists" key={coin.id}>
    <div className="listImg"><img className="listPic" src={coin.image} alt=""/> </div>
    <div className="listName"><span className="spanName">{coin.name}</span> </div>
    <div className="listSym"><span>{coin.symbol.toUpperCase()}</span></div>
    <div className="listRank"><span>{coin.market_cap_rank}</span></div>
    <div className="listCp"><span><b>$</b>{coin.current_price.toLocaleString()}</span></div>
    <div className="listVol"><span><b>$</b>{coin.total_volume.toLocaleString()}</span></div>
    <div className="listChange"><span>{coin.price_change_percentage_24h}<b>%</b></span></div>
    <div className="listMcp"><span><b>$</b>{coin.market_cap.toLocaleString()}</span></div>
</div>
    );
});

    return (
        <div>
        <div className="nav"><h1><img src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" alt=""/> Crypto check</h1></div>
        <div className="ui form">
        <div className="ui input focus" style={{marginLeft:"40px"}}>
  <input type="text" value={text} placeholder="Search Coin" onChange={onInputChange}/>
</div>
</div>

<div className="ui horizontal segments head">
    <div className="headName"><span>Name</span></div>
    <div  className="headSym"><span>Symbol</span></div>
    <div  className="headRank"><span>Rank</span></div>
    <div  className="headCp"><span>Current Price</span></div>
    <div  className="headVol"><span>24h Volume</span></div>
    <div  className="headPc"><span>Price Change(24hrs)</span></div>
    <div  className="headMc"><span>Market Cap</span></div>
</div>
      {renderedList}
        </div>
       

    )
};

export default App;