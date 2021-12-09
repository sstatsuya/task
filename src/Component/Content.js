import { useContext } from "react";
import { Context } from "./Provider";
import * as Actions from "./Actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function Content() {
  const [state, dispatch] = useContext(Context);
  const {jobs, isFilter, jobsTemp, searchInput, filterLevel, filterDone} = state;
  var jobList = isFilter?[...jobsTemp]:[...jobs]
  return (
    <>
      <div className="row mb-2">
        <div className="col col-lg-4">
        </div>
        <div className="col col-lg-4">
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={() => {
              dispatch(Actions.toggleAdding(true));
            }}
          >
            Thêm Công Việc
          </button>
        </div>
        <div className="col col-lg-4">
        </div>
        
      </div>
      <div className="row">
        <table className="table table-bordered txt-small">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Mức độ</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input
                  type="text"
                  className="form-control txt-small"
                  placeholder="Nhập để tìm kiếm"
                  value={searchInput}
                  onChange={(e)=>{dispatch(Actions.setSearchInput(e.target.value))}}
                />
              </td>
              <td>
                <select value={filterLevel} onChange={(e)=>{dispatch(Actions.setFilterLevel(e.target.value))}} className="form-control txt-small" name="" id="">
                  <optgroup className="txt-small">
                    <option value="">Tất cả</option>
                    <option value="easy">Đơn giản</option>
                    <option value="normal">Bình thường</option>
                    <option value="hard">Phức tạp</option>
                  </optgroup>
                </select>
              </td>
              <td>
                <select value={filterDone} onChange={(e)=>{dispatch(Actions.setFilterDone(e.target.value))}} className="form-control txt-small" name="" id="">
                    <optgroup className="txt-small">
                      <option value="">Tất cả</option>
                      <option value="done">Hoàn thành</option>
                      <option value="undone">Chưa xong</option>
                    </optgroup>
                </select>
              </td>
              <td></td>
            </tr>
            {
            jobList.map((job, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td style={{maxWidth: 200}}>{job.name}</td>
                  <td>
                    <span className={"label label-" + job.level}>
                      {job.level === "easy"
                        ? "Đơn giản"
                        : job.level === "normal"
                        ? "Bình thường"
                        : "Phức tạp"}
                    </span>
                  </td>
                  <td>
                    <span className={job.done==="done"?'icon-check':'icon-times'}>
                      {job.done==="done"?<>&#10003;</>:<>&times;</>}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning text-white"
                      onClick={() => {
                        dispatch(Actions.toggleEditing(true));
                        dispatch(Actions.setJobInput(job.name));
                        dispatch(Actions.setLevelInput(job.level));
                        dispatch(Actions.setJobEdit(job.id));
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} className="me-1" />
                      Sửa
                    </button>
                    <button
                      className="btn btn-danger text-white ms-3"
                      onClick={() => dispatch(Actions.deleteJob(job.id))}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} className="me-1" />
                      Xóa
                    </button>
                    { job.done==="undone" && 
                      <button
                        className="btn btn-primary text-white ms-3"
                        onClick={() => dispatch(Actions.setDone(job.id))}
                      >
                        <FontAwesomeIcon icon={faCheck} className="me-1" />
                        Xong
                      </button>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Content;
