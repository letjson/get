// append.js
/**
 *
 * @param targets
 * @param target
 * @param selector
 * @param event
 * @param target_group
 * @param target_item
 * @param f
 */
function append(targets, target, selector, event, target_group, target_item, f) {
    jlogs(f, ' addEventListener selector event', selector, event);
    jlogs(f, ' addEventListener targets', targets);

    var first_target = targets[target];
    jlogs(f, ' first_target ', first_target);

    if (isArray(first_target)) {
        // var selector = '';
        for (var id in first_target) {
            jlogs(f, ' isArray', ' id ', id);
            var obj = first_target[id];
            jlogs(f, ' isArray', ' obj ', obj);
            var name = Object.keys(first_target[id])[0];
            var value = first_target[id][name];

            jlogs(f, ' isArray', ' name ', name);
            jlogs(f, ' isArray', ' value ', value);

            var responseText = '<' + target_item
                // + ' name="' + name + '"'
                + ' value="' + value + '"' + ' >';
            responseText += value;
            responseText += "</" + target_item + ">";

            jlogs(f, ' isArray', ' responseText ', responseText);

            getTarget(target_group).insertAdjacentHTML('beforeend', responseText);


        }
    } else {
        jlogs(f, ' isArray ERROR object', selector);
        error(selector);
    }
}
