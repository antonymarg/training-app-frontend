export const createAction =
  (namespace: string) =>
  <Payload = void>(type: string) => {
    const actionType = `${namespace}//${type}`;
    const action = (payload: Payload) => {
      return { type: actionType, payload };
    };
    action.type = actionType;
    return action;
  };

export interface IAction<IPayload = void> {
  type: string;
  payload: IPayload;
}
