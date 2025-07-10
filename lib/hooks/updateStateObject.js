/** A major bad part about react states is updating objects.  You have to copy the state object and write into the copy.  States should be READ ONLY
    For more documentation on this https://react.dev/learn/updating-objects-in-state#treat-state-as-read-only
    * @param {String} key - key of the object you're updating
    * @param {*} value - value of the key you're updating
    * @param {Object} stateObject - Object to be updated by the key and value parameters
    * @param {Function} setStateObject - React setState Function to update the object and inform react that the state has changed
    */

export function updateStateObject(key, value, stateObject, setStateObject) {
    const stateObjectUpdate = stateObject;
    stateObjectUpdate[key] = value;
    setStateObject(stateObjectUpdate);
}
