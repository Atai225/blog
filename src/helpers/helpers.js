export const filterID = (isReversed, array ) => {
    let filtered;
    isReversed ? filtered = ([...array].sort((a, b) => a.id > b.id ? 1 : -1)) 
       : filtered = ([...array].sort((a, b) => a.id > b.id ? -1 : 1))
    return filtered;
 }

export const filterCity = (isReversed, array ) => {
    let filtered;
    isReversed ? filtered = ([...array].sort((a, b) => a.address.city > b.address.city ? 1 : -1)) 
       : filtered = ([...array].sort((a, b) => a.address.city > b.address.city ? -1 : 1))
    return filtered;
}

export const filterABC = (isReversed, array ) => {
   let filtered;
   isReversed ? filtered = ([...array].sort((a, b) => a?.title > b?.title || a?.name > b?.name ? 1 : -1)) 
      : filtered = ([...array].sort((a, b) => a.title > b.title ? -1 : 1))
   return filtered;
}

export const searchPhone = (e, array) => ([...array].filter((user) => user.phone.startsWith(e.target.value)))
export const searchTitle = (e, array) => ([...array].filter((user) => user.title.startsWith(e.target.value)))
export const searchName = (e, array) => ([...array].filter((user) => user.name.startsWith(e.target.value)))