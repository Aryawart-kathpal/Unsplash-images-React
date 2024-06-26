import { useGlobalContext } from "./context";

const SearchForm = () => {

    const {setSearchTerm} = useGlobalContext();

    const handleSubmit = (e)=>{
        e.preventDefault();
        // console.log(e.target.elements);-> to get all the elements in the form

        const searchValue=e.target.elements.search.value;
        if(!searchValue) return;
        setSearchTerm(searchValue);
    }
  return (
    <section>
        <h1 className="title">unsplash images</h1>
        <form className="search-form" onSubmit={handleSubmit}>
            <input type="text" name="search" className="form-input search-input" placeholder="cat"/>
            <button type="submit" className="btn">
                search
            </button>
        </form>
    </section>
  )
}
export default SearchForm