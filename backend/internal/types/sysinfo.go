package types

type SysInfo struct {
	OS           string `json:"os"`
	Architecture string `json:"architecture"`
	CPUCores     int    `json:"cpu_cores"`
	GoVersion    string `json:"go_version"`
}
