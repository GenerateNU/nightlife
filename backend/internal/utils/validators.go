// internal/utils/validators.go
package utils

import (
    "regexp"
    "strings"
)

// Check if the string is a valid email address
func IsEmail(input string) bool {
    return strings.Contains(input, "@")
}

// Check if the string is a valid UUID
func IsUUID(input string) bool {
    uuidRegex := regexp.MustCompile(`^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$`)
    return uuidRegex.MatchString(input)
}
