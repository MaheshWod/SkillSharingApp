
// import { useState } from 'react'
import NavFooter from '../../Components/NavFooter'

// eslint-disable-next-line
import { useSearch } from '../../Context/search'

const Search = () => {
  // eslint-disable-next-line
  const [values, setValues ] = useSearch()
  // console.log(values)

  return (
    <NavFooter>
      <div className=' px-8'>
        <div className='px-4 py-1'>
          <h3>{values?.results.length < 1 ? "Not found" : `Found ${values?.results.length}`}</h3>
        </div>

        <div className="md:grid md:grid-cols-5 grid-cols-1 gap-4 justify-center py-2 px-4">
          {
            values?.results?.map((p) => (
              <div
                key={p._id}
                className="block w-64 border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-zinc-200"
              >
                {p.photo ? (
                    <img
                      src = {`/api/v1/products/product-photo/${p._id}`}
                      className="w-full h-48 object-cover"
                      alt={p.name || "Product Image"}
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500">No Image</p>
                    </div>
                  )}
                <div className="py-2 px-4">
                  <h5 className="text-lg font-semibold">{p.name || "No Name"}</h5>
                  <p className="text-gray-600 text-sm mt-2">
                    {p.description?.slice(0, 30) || "No Description"}...
                  </p>
                  <p className="text-gray-600 text-sm mt-2">Price: ${p.price || "N/A"}</p>
                </div>
                <div className="flex justify-between px-4 mb-2 space-x-4">
                    <button className="bg-zinc-400 text-black rounded hover:bg-slate-600 py-1 px-2 hover:text-white">
                      More Detail
                    </button>
                    <button className="bg-orange-400 text-black rounded hover:bg-yellow-200 py-1 px-2">
                      Add To Cart
                    </button>
                  </div>
              </div>
            ))


            
          }


        </div>
        
        
      </div>
    </NavFooter>
  )
}

export default Search
