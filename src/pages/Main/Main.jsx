import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "../../components/Search/Search";
import Users from "../../components/UserItems/UserItems";
import './Main.css';


function Main() {
  const users = useSelector(store => store.posts.users)
  const [filtered, setFiltered] = useState(users);
  const [isReversedID, setIsReversedID] = useState(false);
  const [isReversedCity, setIsReversedCity] = useState(false);

   
  
    useEffect(() => {
        setFiltered(users)
    }, [users])


  const filterById = () => {
     isReversedID ? 
        setFiltered([...users].sort((a, b) => a.id > b.id ? 1 : -1)) 
        : setFiltered([...users].sort((a, b) => a.id > b.id ? -1 : 1))
    setIsReversedID(!isReversedID)
  }
  const filterByCity = () => {
    isReversedCity ? 
        setFiltered([...users].sort((a, b) => a.address.city > b.address.city ? 1 : -1)) 
        : setFiltered([...users].sort((a, b) => a.address.city > b.address.city ? -1 : 1))
    setIsReversedCity(!isReversedCity)
  }
  
  const searchPhoneNum = (e) => {
    setFiltered([...users].filter((user) => user.phone.startsWith(e.target.value)));
  }

  return (
    <div className="main">
        <div className="container">
          <Search search={(e) => searchPhoneNum(e)} filterByA={filterById} filterByB={filterByCity} isReversedA={isReversedID} isReversedB={isReversedCity}/>
          <ul className="users__list">
              {filtered ? filtered.map((user) => <Users key={user.id} info={user}/>) : <div className="error">Нет совпадений :/</div>}
          </ul>
        </div>
    </div>
  )
}

export default Main;
