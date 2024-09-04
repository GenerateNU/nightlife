package hello

import (
	"testing"
)

func TestDBConnection(t *testing.T) {
	if HelloWorld() != "Hello, World!" {
		t.Error("Hello world failed")
	}
}