import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "../../components/Search/Search";
import Users from "../../components/UserItems/UserItems";
import { filterCity, filterID, searchPhone } from "../../helpers/helpers";
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
    setFiltered(filterID(isReversedID, users))
    setIsReversedID(!isReversedID)
  }

  const filterByCity = () => {
    setFiltered(filterCity(isReversedCity, users))
    setIsReversedCity(!isReversedCity)
  }
  
  const searchPhoneNum = (e) => setFiltered(searchPhone(e, users))


  return (
    <main className="main">
          <Search search={(e) => searchPhoneNum(e)} filterByA={filterById} filterByB={filterByCity} isReversedA={isReversedID} isReversedB={isReversedCity}/>
          <ul className="users__list">
              {filtered.length > 0 ? filtered.map((user) => <Users key={user.id} info={user}/>) : <div className="error">Нет совпадений :/</div>}
          </ul>
    </main>
  )
}

export default Main;
