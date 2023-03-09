import { useState, useEffect } from 'react';

import Card from '../components/Card';
import FormField from '../components/FormField';
import Loader from '../components/Loader';
import { photoProps } from './CreatePost';

const RenderCards = ({ data, title}: { data: photoProps[] | null, title: string}) => {
  if(data && data?.length > 0) {
    return (
      <>
        {data.map((post: photoProps) => <Card key={post._id} id={post._id!} name={post.name} prompt={post.prompt} photo={post.photo} />)}
      </>
    );
  }

  return <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>;
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState<null | photoProps[]>(null);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);
  const [searchedResults, setSearchedResults] = useState<null | photoProps[]>(null);

  useEffect(() => {
    const fecthPost = async () => {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if(response.ok) {
          const result = await response.json();

          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        if( error instanceof Error) {
          alert(error);
        }
      } finally {
        setLoading(false);
      }
    }

    fecthPost();
  },[]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(searchTimeout) {
      clearTimeout(searchTimeout);
    }

    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts ? allPosts.filter((item: photoProps) => item.name.toLowerCase().includes(searchText.toLowerCase()) || 
        item.prompt.toLowerCase().includes(searchText.toLowerCase())) : null;
  
        setSearchedResults(searchResults);
      }, 500)
    )
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          The Community Showcase
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Browse through a collection of imaginative and visually stunning images generated by DALL-E AI
        </p>
      </div>
      <div className="mt-16">
        <FormField 
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearch}
        />          
      </div>
      <div className="mt-10">
        {
          loading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              {searchText && (
                <h2 className="font-medium text-[#666e75] text-xl mb-3">
                  Showing results for <span className='text-[#222328]'>{searchText}</span>
                </h2>
              )}
              <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                {searchText ? (
                  <RenderCards
                    data={searchedResults}
                    title="No search results found"
                  />
                ) : (
                  <RenderCards
                    data={allPosts}
                    title="No posts found"
                  />
                )}
              </div>
            </>
          )
        }
      </div>
    </section>
  )
};

export default Home;
