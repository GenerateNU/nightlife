package hello

import (
	"testing"
)

func TestHello(t *testing.T) {
	if RetHelloWorld() != "Hello, World!" {
		t.Error("Hello world failed")
	}
}
