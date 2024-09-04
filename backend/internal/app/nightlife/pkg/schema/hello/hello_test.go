package hello

import (
	"testing"
)

func TestHello(t *testing.T) {
	if HelloWorld() != "Hello, World!" {
		t.Error("Hello world failed")
	}
}