import {produce} from "immer";
const initialState={
    headerHeight:0,
    footerHeight:0,
}
const ultiReducer= (state= initialState, action) =>{
    return produce (state, (draft)=>{
        switch (action.type){
            case "GET_HEADER_HEIGHT":
                draft.headerHeight = action.payload;
                break;
                case "GET_FOOTER_HEIGHT":
                    draft.footerHeight=action.payload;
                    break;
                    default: break;
        }
    } )
}

export default ultiReducer