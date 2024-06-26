import { useQuery } from "@tanstack/react-query";
import  axios  from "axios";
import { useGlobalContext } from "./context";

const url =`https://api.unsplash.com/search/photos?client_id=${import.meta.env.VITE_API_KEY}`;

const Gallery = () => {

  const {searchTerm} = useGlobalContext();

  // now ans issue came that, when we input the value in form, the images don't get updated, because queryKey is cached by react query, so to avoid this, we can pass the searchTerm as a queryKey, so that when the searchTerm changes, the queryKey changes and the images get updated

  const response = useQuery({
    queryKey:['images',searchTerm],
    queryFn:async()=>{
      const result = await axios.get(`${url}&query=${searchTerm}`);

      return result.data;
    }
  });
  // console.log(response);
  if(response.isLoading){
    return <section className="image-container">
      <h4>Loading...</h4>
    </section>
  }

  if(response.isError){
    return <section className="image-container">
      <h4>There was an error...</h4>
      </section>
  }

  const results = response.data.results;
  if(results.length<1){
    return <section className="image-container">
      <h4>No results found...</h4>
    </section>
  }

  return (
    
    <section className="image-container">
      {results.map((item)=>{
        const url = item?.urls?.regular;
        return <img src={url} alt={item.alt_description} key={item.id} className="img"/>
      })}
    </section>
  )
}
export default Gallery