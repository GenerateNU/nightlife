package hello

import (
	"github.com/gin-gonic/gin"
)



func HelloGroup(v1 *gin.RouterGroup) *gin.RouterGroup {
    helloGroup := v1.Group("hello_world")
    {
        helloGroup.GET("", getHelloWorld)
    }
    return helloGroup
}


func getHelloWorld(c* gin.Context) {
	c.String(200, "Hello World")
}
