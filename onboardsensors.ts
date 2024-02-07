namespace modules {
    /**
     * The Temperature measured onboard
     */
    //% fixedInstance whenUsed block="Onboard Temperature"
    export const OnboardTemperatureClient = new TemperatureClient("Onboard Temperature?dev=self&variant=indoor")

    /**
    * The lightlevel measured onboard
    */
    //% fixedInstance whenUsed block="Onboard Lightlevel"
    export const OnboardLightlevelClient = new LightLevelClient("Onboard Lightlevel?dev=self&variant=ReverseBiasedLED")

    /**
    * The magnetic field  measured onboard
    */
    //% fixedInstance whenUsed block="Onboard Magnetic field"
    export const OnboardMagnetigFieldClient = new MagneticFieldLevelClient("Onboard Magnetic field?dev=self&variant=AnalogS")

    /**
    * The acceleration measured onboard
     */
    //% fixedInstance whenUsed block="Onboard Acceleration"
    export const OnboardAccelerationClient = new AccelerometerClient("Onboard Acceleration?dev=self")

    /**
    * The soundlevel measured onboard
     */
    //% fixedInstance whenUsed block="Onboard Soundlevel"
    export const OnboardSoundlevelClient = new SoundLevelClient("Onboard Soundlevel?dev=self")

}


namespace servers {

    function start() {

        jacdac.productIdentifier = 0x3347a2d2
        jacdac.deviceDescription = "Onboard Sensors"
        jacdac.startSelfServers(() => [
            jacdac.createSimpleSensorServer(
                jacdac.SRV_TEMPERATURE,
                jacdac.TemperatureRegPack.Temperature,
                () => input.temperature(),
            ),
        ])

        jacdac.startSelfServers(() => [
            jacdac.createSimpleSensorServer(
                jacdac.SRV_LIGHT_LEVEL,
                jacdac.LightLevelRegPack.LightLevel,
                () => input.lightLevel() / 255 ,
            ),
        ])

        jacdac.startSelfServers(() => [
            jacdac.createSimpleSensorServer(
                jacdac.SRV_MAGNETIC_FIELD_LEVEL,
                jacdac.MagneticFieldLevelRegPack.Strength,
                () => -input.magneticForce(Dimension.Z) / 255,
            ),
        ])

        jacdac.startSelfServers(() => [
            jacdac.createSimpleSensorServer(
                jacdac.SRV_SOUND_LEVEL,
                jacdac.SoundLevelRegPack.SoundLevel,
                () => input.soundLevel() / 255,
            ),
        ])

        jacdac.startSelfServers(() => [
            jacdac.createMultiSensorServer(
                jacdac.SRV_ACCELEROMETER,
                jacdac.AccelerometerRegPack.Forces,
                () => [-input.acceleration(Dimension.X) / 255.0, input.acceleration(Dimension.Y) / 255.0, -input.acceleration(Dimension.Z) / 255.0],
            ), // Warum Dimension.X negativ!? Fehler in Jacdac?
        ])
    }

    start()
}
