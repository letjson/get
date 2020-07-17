$(".add_input").hide();
$(".add_list").show();

$(".del_button").on("click", function (e) {
    e.preventDefault();

    var list = $(this).parent().find('select');
    var input = $(this).parent().find('input');
    // var input_val = $(this).val();
    console.log('>input del_button', input, input_val, input.is(":visible"));

    if (input.is(":visible")) {
        input.val("");
        input.hide();
        list.show();
        list.prop("selectedIndex", 0);
        list.focus();
    } else {
        delItemSelect(this);
    }
});

$(".add_button").on("click", function (e) {
    e.preventDefault();
    addItemSelect(this);
});
//
// $(".add_button").on('keyup', function (e) {
//     e.preventDefault();
//
//     if (e.keyCode === 13) {
//         // Do something
//         addItemSelect(this);
//     }
// });

function addItemSelect(that) {
    var list = $(that).parent().find('select');
    // var list_val = $(list).val();

    // console.log('>list addItemSelect', list, list_val);

    var input = $(that).parent().find('input');
    var input_val = $(input).val();

    console.log('>input addItemSelect', input, input_val);

    if (input_val.length) {
        console.log('>add to list', input_val);
        // innerHTML
        // var item = $('<option value="' + input_val + '">' + input_val + '</option>');
        var item = $('<option>').val(input_val).text(input_val);
        list.prepend(item);

        input.hide();
        input.val("");
        // list.append(item);
        console.log('>input', input);

        list.show();
        list.prop("selectedIndex", 0);
        list.focus();
        console.log('>list', list);

    } else {
        // $(".add_input").show();
        input.show();
        // $(".add_list").hide();
        list.hide();
        input.focus();
    }
}

function delItemSelect(that) {
    var list = $(that).parent().find('select option:selected');
    // var list1 = list[0];
    // var list_val = $(list).val();
    list.remove();
}
