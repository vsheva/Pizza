
function Categories({ value, onChangeCategory }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  /*
     const [activeIndex, setActiveIndex] = useState(0);


    const onClickHandler = index => {
        setActiveIndex(index);
    };*/

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => {
          return (
            <li key={i} onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''}>
              {categoryName}
            </li>
          );
        })}

        {/*<li onClick={()=>{onClickHandler(0)}} className={activeIndex===0 ?"active" :""}>Все</li>*/}
      </ul>
    </div>
  );
}

export default Categories;
/*
<li onClick={()=>{onClickHandler(1)}} className={activeIndex===1 ?"active" :""}>Мясные</li>
<li onClick={()=>{onClickHandler(2)}} className={activeIndex===2 ?"active" :""}>Вегетарианская</li>
<li onClick={()=>{onClickHandler(3)}} className={activeIndex===3 ?"active" :""}>Гриль</li>
<li onClick={()=>{onClickHandler(4)}} className={activeIndex===4 ?"active" :""}>Острые</li>
<li onClick={()=>{onClickHandler(5)}} className={activeIndex===5 ?"active" :""}>Закрытые</li>*/
