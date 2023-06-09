import "./expense.scss";

const Expense = () => {
  return (
    <div className="project-teams">
      <div className="team-member-info">
        <h4 className="project-team-h4">Project Team Members</h4>
      </div>

      <table className="tables" style={{ width: "100%" }}>
        <tr className="tr-header">
          <th className="header-th-1">Name Surname</th>
          <th className="header-th-2">Job</th>
          <th className="header-th-3">Yaş</th>
        </tr>
        <tr className="tr">
          <td className="table-td-1">Ahmet Yılmaz</td>
          <td className="table-td-2">Software Developer</td>
          <td className="table-td-3">30</td>
        </tr>
        <tr className="tr">
          <td className="table-td-1">Mehmet Yılmaz</td>
          <td className="table-td-2">Software Developer</td>
          <td className="table-td-3">25</td>
        </tr>
        <tr className="tr">
          <td className="table-td-1">Mehmet Yılmaz</td>
          <td className="table-td-2">Software Developer</td>
          <td className="table-td-3">25</td>
        </tr>
        <tr className="tr">
          <td className="table-td-1">Mehmet</td>
          <td className="table-td-2">Kara</td>
          <td className="table-td-3">25</td>
        </tr>
      </table>
    </div>
  );
};

export default Expense;
