CMPT 361: Assignment 3a - WebGL Robot Arm
Timothy James Montesa (301261623)
August 2, 2019

This application was made in accordance with the steps described. Some notes:
- I have further abstracted some of WebGL's functions, so it may be difficult to understand them at first.
- If the robot cannot reach the sphere, the background will turn red.
- Speaking of unreachable, the robot's angle algorithm was taken from the class notes on inverse kinematics.
  It cannot reach below the height of the base and will fail.
- The sphere was not rendered recursively because it is not part of the arm.

Some information were taken from these sources:
- Class Notes (Chapter 9)
- CSSS Discord Group - CMPT 361 Room

You must use a server to run the application (cannot just open HTML file). The shaders must be imported and 
most browsers do not allow this due to security concerns.

Or, you may use this Github link to demo it:
https://tmontesa.github.io/webgl-robot/

Thanks and enjoy your day! :-)

                                  _____
                                 |     |
                                 | | | |
                                 |_____|
                           ____ ___|_|___ ____
                          ()___)         ()___)
                          // /|           |\ \\
                         // / |           | \ \\
                        (___) |___________| (___)
                        (___)   (_______)   (___)
                        (___)     (___)     (___)
                        (___)      |_|      (___)
                        (___)  ___/___\___   | |
                         | |  |           |  | |
                         | |  |___________| /___\
                        /___\  |||     ||| //   \\
                       //   \\ |||     ||| \\   //
                       \\   // |||     |||  \\ //
                        \\ // ()__)   (__()
                              ///       \\\
                             ///         \\\
                           _///___     ___\\\_
                          |_______|   |_______|

