type PaginationProps = {
  totalPages: number;
  currentPage: number;
  handlePageChange: (pageNumber: number) => void;
  siblingCount?: number;
}

export default function Pagination({
  totalPages,
  currentPage,
  handlePageChange,
  siblingCount = 1, //jumlah halaman di sblah kiri & kanan
} : PaginationProps){

  const generatePageNumbers = () => { //hasilin nomor halaman yang akan ditampilkan
    const totalPageNumbers = siblingCount * 2 + 3; //jumlah pagenya
    const totalButtons = Math.min(totalPageNumbers, totalPages); //jumlah button yg ditampilkan

    let startPage = Math.max(2, currentPage - siblingCount);
    let endPage = Math.min(totalPages - 1, currentPage + siblingCount);

    if (currentPage <= siblingCount + 1) { //atur start page klo current di awal
      startPage = 2;
      endPage = totalButtons - 2;
    }

    if (currentPage + siblingCount >= totalPages) { //atur start page klo current di akhir
      startPage = totalPages - (totalButtons - 2);
      endPage = totalPages - 1;
    }

    const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    
    return [1, ...pages, totalPages]; //hal pertama, hal" nomor yg dihasilkan, hal terakhir
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex justify-center space-x-2 py-10">
      <button
        className="px-3 py-1 rounded-md bg-blue-200 text-gray-700 transition"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}>
        {"<"}
      </button>

      {pageNumbers.map((page, index) => (
        <button
          key={index}
          className={`px-3 py-1 rounded-md ${
            currentPage === page ? 'bg-primary-button text-white' : 'bg-blue-200'
          } transition`}
          onClick={() => handlePageChange(page)}
          disabled={page === currentPage}>
          {page}
        </button>
      ))}

      <button
        className="px-3 py-1 rounded-md bg-blue-200 text-gray-700 transition"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        {">"}
      </button>
    </div>
  );
};
