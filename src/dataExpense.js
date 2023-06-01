export const userColumns = [
  {
    field: "expenditureType",
    headerName: "Expense Type",
    width: 220,
  },
  {
    field: "requestDate",
    headerName: "Date Of Request",
    width: 150,
  },
  {
    field: "amountOfExpenditure",
    headerName: "Amount",
    width: 140,
  },
  {
    field: "currency",
    headerName: "Currency",
    width: 140,
  },
  {
    field: "file",
    headerName: "File",
    width: 400,
    renderCell: (params) => {
      // Eğer 'file' bir dizi ise, her birini ayrı bir resim olarak oluşturabiliriz
      if (Array.isArray(params.value)) {
        return (
          <div style={{ display: "flex", gap: "10px" }}>
            {params.value.map((fileURL, index) => (
              <a
                key={index}
                href={fileURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={fileURL}
                  alt={`File ${index + 1}`}
                  width="125"
                  height="125"
                />
              </a>
            ))}
          </div>
        );
      } else {
        return (
          <a href={params.value} target="_blank" rel="noopener noreferrer">
            <img src={params.value} alt="File" width="50" height="50" />
          </a>
        );
      }
    },
  },
  {
    field: "desc",
    headerName: "DESC",
    width: 250,
  },
  {
    field: "replyDate",
    headerName: "Reply Date",
    width: 180,
  },
  {
    field: "approvalStatus",
    headerName: "Status",
    width: 200,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.approvalStatus}`}>
          {params.row.approvalStatus}
        </div>
      );
    },
  },
];

//temporary data
export const userRows = [
  {
    id: 1,
    status: "passive",
    name: "1snow@gmail.com",
    amount: 35,
  },
  {
    id: 2,
    username: "Jamie Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    name: "2snow@gmail.com",
    status: "pending",
    amount: 42,
  },
  {
    id: 3,
    username: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    status: "pending",
    amount: 45,
  },
  {
    id: 4,
    username: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    status: "pending",
    amount: 16,
  },
  {
    id: 5,
    username: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "5snow@gmail.com",
    status: "passive",
    amount: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "6snow@gmail.com",
    status: "pending",
    amount: 15,
  },
  {
    id: 7,
    username: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "7snow@gmail.com",
    status: "passive",
    amount: 44,
  },
  {
    id: 8,
    username: "Frances",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "8snow@gmail.com",
    status: "pending",
    amount: 36,
  },
  {
    id: 9,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "pending",
    amount: 65,
  },
  {
    id: 10,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    amount: 65,
  },
  {
    id: 11,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    amount: 65,
  },
  {
    id: 12,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    amount: 65,
  },
  {
    id: 13,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    amount: 65,
  },
  {
    id: 14,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    amount: 65,
  },
  {
    id: 15,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    amount: 65,
  },
  {
    id: 16,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    amount: 65,
  },
  {
    id: 17,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    amount: 65,
  },
  {
    id: 18,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    amount: 65,
  },
  {
    id: 19,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
  {
    id: 20,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
  {
    id: 21,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
];
