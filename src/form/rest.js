// rest.js
/**
 *
 * @param url
 * @param separator
 * @param response
 * @param error
 * @param success
 * @returns {Rest}
 * @constructor
 */
var Rest = function (url, separator, response, error, success) {
    const f = 'Rest';

    this.url = url;
    this.separator = '/';
    this.response = response;

    if (separator !== undefined) {
        // this.selector = selector + 'id=';
        this.separator = separator;
    }
    // this.error = {};
    // this.success = {};
    this.error = error;
    this.success = success;

    var rest = this;


    rest.setUrl = function (url) {
        response.url = url;
        return rest;
    };

    rest.setSeparator = function (separator) {
        rest.separator = separator;
        return rest;
    };


    rest.setResponse = function (response) {
        rest.response = response;
        return rest;
    };


    this.byMethod = function (method, data) {


        if (method === 'GET') {
            var id = data.id;
            rest.get(id);
        }
        if (method === 'POST') {
            rest.post(data);
        }
        if (method === 'PUT') {
            var id = data.id;
            rest.put(id, data);
        }
        if (method === 'DELETE') {
            var id = data.id;
            rest.delete(id);
        }

    }

    rest.all = function () {

        var xhr = createCORSRequest('GET', rest.url);
        if (!xhr) {
            throw new Error('CORS not supported');
        }
        xhr.onload = function () {
            rest.response(xhr, error, success);
        }
        xhr.send(null);

        return rest;
    }


    rest.get = function (id) {

        var xhr = createCORSRequest('GET', rest.url + rest.separator + id);
        if (!xhr) {
            throw new Error('CORS not supported');
        }
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onload = function () {
            rest.response(xhr, error, success);
        }
        try {
            xhr.send(null);
        } catch (e) {
            err(e);
        }
        return rest;
    }

    // create
    rest.post = function (data) {

        var xhr = createCORSRequest("POST", rest.url);
        if (!xhr) {
            throw new Error('CORS not supported');
        }
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onload = function () {
            rest.response(xhr);
        }
        try {
            xhr.send(rest.getJson(data));
        } catch (e) {
            err(e);
        }
        return rest;
    }

    // update
    rest.put = function (id, data) {
        var xhr = createCORSRequest("PUT", rest.url + rest.separator + id);
        if (!xhr) {
            throw new Error('CORS not supported');
        }
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onload = function () {
            rest.response(xhr, error, success);
        }
        try {
            xhr.send(rest.getJson(data));
        } catch (e) {
            err(e);
        }
        return rest;
    }

    rest.delete = function (id) {
        var xhr = createCORSRequest("DELETE", rest.url + rest.separator + id);
        if (!xhr) {
            throw new Error('CORS not supported');
        }
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onload = function () {
            rest.response(xhr, error, success);
        }
        try {
            xhr.send(null);
        } catch (e) {
            err(e);
        }
        return rest;
    }

    this.getJson = function (data) {
        var json = JSON.stringify(data);
        return json;
    }

    return this;
}
