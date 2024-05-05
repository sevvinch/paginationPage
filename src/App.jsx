import React, { useState, useEffect } from 'react';

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); 

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`https://fakestoreapi.com/products`);
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8 pt-[10%]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {currentItems.map((product, index) => (
              <div key={index} className="bg-[#97D99E] shadow-md rounded-lg p-4">
                <div className="font-bold text-lg text-gray-100">{product.title}</div>
                <div className="text-gray-100">${product.price}</div>
                <div className="text-sm text-gray-100">{product.description}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="fixed bottom-0 left-0 w-full bg-gray-100 py-4">
          <div className="container mx-auto flex justify-center">
            <button
              onClick={prevPage}
              className={`bg-[#3BBE47] hover:bg-[#97D99E] text-white font-bold py-2 px-4 rounded mr-2 ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`mx-2 px-4 py-2 rounded hover:bg-[#3BBE47] hover:text-white ${currentPage === i + 1 ? 'bg-[#3BBE47] text-white font-bold' : 'bg-[#97D99E] text-gray-100'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={nextPage}
              className={`bg-[#3BBE47] hover:bg-[#97D99E] text-white font-bold py-2 px-4 rounded ml-2 ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
