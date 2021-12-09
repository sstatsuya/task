import { useContext } from "react";
import { Context } from "./Provider";
import * as Actions from "./Actions";
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.min.css'

function AddJob() {
  toast.configure()
  const [state, dispatch] = useContext(Context);
  const { isShowAdding, isShowEditing, jobInput, levelInput } = state;
  return (
    <div className="card p-3">
      <div className="card-header bg-warning text-white">
        {isShowAdding ? "Thêm công việc" : "Sửa đổi công việc"}
      </div>
      <div className="card-body">
        <div>
          <label htmlFor="name" className="form-label">
            Tên công việc
          </label>
          <input
            type="text"
            className="form-control txt-small"
            name=""
            id="name"
            value={jobInput}
            onChange={(e) => dispatch(Actions.setJobInput(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="type" className="form-label">
            Phân loại
          </label>
          <select
            onChange={(e) => dispatch(Actions.setLevelInput(e.target.value))}
            value={levelInput}
            className="form-control txt-small"
            name=""
            id="type"
          >
            <optgroup className="txt-small">
              <option value="easy">Đơn giản</option>
              <option value="normal">Bình thường</option>
              <option value="hard">Phức tạp</option>
            </optgroup>
          </select>
        </div>
        <div className="mt-4">
          <button
            className="btn btn-warning text-white"
            onClick={() => {
                if(jobInput==="")  toast.warning('Không được để trống công việc', {position: toast.POSITION.TOP_LEFT, autoClose: 2400})
                else if(isShowAdding)dispatch(Actions.addJob())
                else if(isShowEditing)dispatch(Actions.editJob())
            }}
          >
            Lưu
          </button>
          <button
            className="btn btn-danger text-white ms-3"
            onClick={() => {
              if (isShowAdding) dispatch(Actions.toggleAdding(false));
              else if (isShowEditing) dispatch(Actions.toggleEditing(false));
            }}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddJob;
