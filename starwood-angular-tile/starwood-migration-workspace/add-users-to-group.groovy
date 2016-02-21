@Grab(group='org.codehaus.groovy.modules.http-builder', module='http-builder', version='0.7.1')

import static groovyx.net.http.ContentType.JSON
import groovyx.net.http.RESTClient
import org.apache.http.entity.StringEntity
import org.apache.http.entity.ContentType
import org.apache.http.HttpRequestInterceptor
import org.apache.http.HttpResponseInterceptor
import org.apache.http.HttpRequest
import org.apache.http.HttpResponse
import org.apache.http.protocol.HttpContext
import org.apache.http.util.EntityUtils
import groovyx.net.http.URIBuilder
import groovy.json.JsonOutput


/*
    Load properties:
    jive.url=https://xyz.jiveon.com
    jive.username=admin
    jive.password=admin
    useridfile=users-to-delete.txt
*/
def props = new Properties()
new File("application.properties").withInputStream {
    stream -> props.load(stream)
}
def config = new ConfigSlurper().parse(props)


def baseUrl = config.jive.url
def jiveUsername = config.jive.username
def jivePassword = config.jive.password
def userIdFile = config.useridfile
def customerGroupId = config.grpid
def http = new RESTClient(baseUrl)

/* setup http client authentication */
http.client.addRequestInterceptor(new HttpRequestInterceptor() {
    void process(HttpRequest request, HttpContext context) {
        request.addHeader('Authorization', 'Basic ' + "${jiveUsername}:${jivePassword}".bytes.encodeBase64().toString())
    }
})

/* setup http client for use with Jive's REST API */
http.client.addResponseInterceptor(new HttpResponseInterceptor() {
    void process(HttpResponse response, HttpContext context) {
        def entity = response.entity

        if (entity) {
            def ctH = entity.contentType
            def contentType = ctH != null ? ContentType.parse(ctH.value) : ContentType.DEFAULT_TEXT

            if (contentType.mimeType != 'application/json') {
                return
            }

            def content = EntityUtils.toString(entity, (java.nio.charset.Charset) contentType.charset)
            content = content.replaceFirst('throw.*?;', '')

            response.setEntity(new StringEntity(content, contentType))
        }
    }
})

def userPaths = []
new File(userIdFile).eachLine(0, { username ->

    println "Fetching details for username ${username}"

    try {
        http.get(path: "/api/core/v3/people/username/${username}") { resp, user ->
            if (resp.status == 200) {
                println "User found with ID ${user.id}"
                userPaths.push(user.resources.self.ref)

                def postResp = http.post(path: "${baseUrl}/api/core/v3/securityGroups/${customerGroupId}/members", contentType: JSON, requestContentType: JSON, body: [user.resources.self.ref])
                if (postResp.status == 204) {
                    println("User added to group")
                }
                else {
                    System.err.println("Error posting user to the group : ${postResp}")
                }

            }
            else {
                System.err.println("No user found with username ${username}")
            }
        };
    }
    catch (Exception e) {
        System.err.println("Exception thrown: " + e.getMessage())
    }

})


