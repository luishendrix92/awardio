import { useReducer } from "react";
import { CUShowPayload } from "../../api/showApi";
import { useAppDispatch } from "../../app/hooks";
import { createShowAsync, updateShowAsync } from "../../slices/showListSlice";

const DEFAULT_IMG_URL = 'https://www.tibs.org.tw/images/default.jpg';

function mergeDefaults(data: CUShowPayload) {
  return {
    title: data.title || 'Untitled Show',
    description: data.description || 'Edit this show to write your own description.',
    image: data.image || DEFAULT_IMG_URL,
    airDate: data.airDate // Already defaults to today's date
  };
}

const emptyShow: CUShowPayload = {
  title: '',
  description: '',
  airDate: new Date().getTime(),
  image: ''
};

type CUShowReducerAction =
  { type: 'SET_TITLE', payload: string } |
  { type: 'SET_DESCRIPTION', payload: string } |
  { type: 'SET_AIR_DATE', payload: number } |
  { type: 'SET_IMAGE', payload: string } |
  { type: 'CLEAN_DATA' };

function CUShowReducer(state: CUShowPayload, action: CUShowReducerAction): CUShowPayload {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload };
    case 'SET_DESCRIPTION':
      return { ...state, description: action.payload };
    case 'SET_AIR_DATE':
      return { ...state, airDate: action.payload };
    case 'SET_IMAGE':
      return { ...state, image: action.payload };
    case 'CLEAN_DATA':
      return emptyShow;
    default:
      return state;
  }
}

interface CUShowCardProps {
  initialFormData?: CUShowPayload;
  isUpdate?: boolean;
  afterSave?: () => void;
  idToUpdate?: number;
}

const noop = (): void => undefined;

function CUShowCard({ isUpdate = false, initialFormData = emptyShow, afterSave = noop, idToUpdate = 0 }: CUShowCardProps) {
  const [showData, dispatch] = useReducer(CUShowReducer, initialFormData);
  const sliceDispatch = useAppDispatch();

  const CUShowHandler = () => {
    const dispatchedAction = isUpdate
      ? sliceDispatch(updateShowAsync({ id: idToUpdate, data: showData }))
      : sliceDispatch(createShowAsync(mergeDefaults(showData)));

    dispatchedAction.finally(() => {
      if (!isUpdate) {
        dispatch({ type: 'CLEAN_DATA' });
      }

      afterSave();
    });
  };

  return (
    <div className="ui raised card">
      <div className="image">
        <img className="fit-cover" src={showData.image || DEFAULT_IMG_URL} alt="Preview" />
      </div>
      <div className="content">
        <div className="description">
          <div className="ui fluid labeled mini input">
            <div className="ui label">Show Title</div>
            <input
              type="text" value={showData.title}
              onChange={e => dispatch({ type: 'SET_TITLE', payload: e.target.value })}
            />
          </div>
          <div className="ui fluid labeled mini input">
            <div className="ui label">Description</div>
            <input
              type="text" value={showData.description}
              onChange={e => dispatch({ type: 'SET_DESCRIPTION', payload: e.target.value })}
            />
          </div>
          <div className="ui fluid labeled mini input">
            <div className="ui label">Image URL</div>
            <input
              type="text" value={showData.image}
              onChange={e => dispatch({ type: 'SET_IMAGE', payload: e.target.value })}
            />
          </div>
          <div className="ui fluid labeled mini input">
            <div className="ui label">Air Date</div>
            <input
              type="date" value={new Date(showData.airDate).toISOString().substring(0, 10)}
              onChange={e => dispatch({ type: 'SET_AIR_DATE', payload: e.target.valueAsNumber })}
            />
          </div>
        </div>
      </div>
      <div className="ui tiny attached buttons">
        {isUpdate && (
          <button className="ui red button" onClick={afterSave}>
            <i className="icon cancel"></i>
            Cancel
          </button>
        )}
        <button className="ui green button" onClick={CUShowHandler}>
          <i className={`icon ${isUpdate ? 'save' : 'add'}`}></i>
          {isUpdate ? 'Save Changes' : 'Add Show'}
        </button>
      </div>
    </div>
  );
}

export default CUShowCard;