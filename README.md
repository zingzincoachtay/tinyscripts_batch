# win10ng-fu

## Pronounce: win-TUNG-foo

_GNU coreutils package is essential. They're portable. It's amazing_

### Purpose: Demonstrating the possibilities with coding natively in Windows and reduce negative impact of collaboration to the work efficiency in office

_Purged confidential information before committing to the repository_

Working smart. Adapting to the given resources. Mind the diminishing return. Use computing time for improved efficiency of daily tasks. Using is not in itself the purpose.

### 01-Generate a list of installed software

Looks at the Programs and Features (Add or Remove Programs) and generate a list of installed software (e.g., third-party programs).

Inspiration: Director of the Regulatory Affairs department assigned me the task to list all installed programs (i.e., third-party programs, not necessarily Windows-native programs such as Internet Explorer) on all PC and laptops in use at the time for the department.

Weighing Options: Three pathways to complete this task immediately came to mind. But the quick and the relatively clean method was generating the list via Batch program since there were about 70-80 machines to repeat the process.

Optimization: Reviewing the workflow, I minimized the manual repetitions. The Batch program itself did not take more than 20 seconds at a time. It could take a minute of screen time each, including waiting for USB driver to install and operating mouse/trackpad to "move" the piped file. USB drive, upon being mounted, could execute a program (while the resultant program acts much like a computer virus may infect the machines). While it was only experimental feature due to antivirus features of modern operating systems, most of the time the `autorun.inf` worked like a charm. It shed most of any manual workflow, except inserting USB drive to the USB port and removing it (unless unable).

USAGE: Place `autorun.inf` and `report.bat` scripts in the root of the USB drive. Make sure the Batch program named in the `autorun.inf` match that of `report` file (if you renamed).

Precaution: Tested on Windows 7 and Windows XP. Have not tested in Windows 8, 8.1, or 10.

### Tracking Team Activities in the given folders

Inspiration: Purchasing department at the helm of new leadership initiated projects to archive documentations of the suppliers, while in response to the pandemic, the senior leadership initiated and tasked each department the cost relief project. The handling of all the concurrent projects has been a team effort but the variability in data entry and tracking progress was also inevitable and foreseen. I took the liberty to drive the progress tracking for the team, assuring consistency of data, reviewing documents objectively, establishing scalable database schema, then also allow for the periodical reproduceable report generating.

Observation: Each project was being completed in its folders. Each project had its own destination folder. The folders were shared and files were added and updated as the tasks were being completed, but the data was entered for tracking by one person.

Weighing Options: Options were either tried-and-true (asking for updates, e.g.) or trying anew. SVN was an overkill and unnecessary for project-based needs. Little cryptography could easily flag for files that changed (without context of changes).

Optimization: Generally, my experience in coordinating work requires consistent (if not so frequent) communication among team members. That is fine and it is indeed the standard of quality. I only wished that the workflow served better instead of adding the permutation of work to it. Challenge of project management is getting up to date information and generating data pertinent to the business decisions. Sun Tzu said: the battles won without fighting is superior to any victories. Only sourcing the updates from direct communication with the teammates not only choke the ability to see the big picture but also put unnecessary burden the team. Why eat a banana with a plate, a knife, and a fork? Run the script once a day to know if the changes exist instead of taking away minutes off of teammates.

USAGE: Tracks the hashes of all files in the specified folders (e.g., organized by projects). Please create "tracking_target" batch file. It should set folders that would routinely be checked.

> set here[1]="absolute_path_to_target_folder"
>
> set here[2]="absolute_path_to_another_target_folder"
>
> set this[1]="absolute_path_to_target_folder"
>
> set this[2]="absolute_path_to_another_target_folder"


The program uses `here` and `this` in an array style. It will also overwrite the existing files if the names do not change when you desire them to change. The `%today%` variable is available because I check for updates daily. It is possible to extend `%today%` to times as well, if you require checking multiple times a day. Lastly, `here` and `this` must have the same array size, meaning `here[1]` and `this[1]` must exist mutually (i.e., command `here` > `this`).

### Simply Launcher

Inspiration: I choose not to use the operating system default browsers for the privacy concern. Work computers are public computers, regardless of password protections. Going portable is appealing more appealing than going Live CD because of persistence. When I am moving on from the public computers, either I can take all my user data with me or delete it in there. Having said that, portable solutions that load all contents and settings to RAM would be even better. Say, Alpine Linux.

Observation: I use the same alternative portable version of my favorite software (or favorite alternative to Windows-native PDF readers). Since I choose to not place any shortcut on the Desktop or Startup Menu, I would have to initiate an instance of the Explorer every morning with a few clicks per software.

Weighing Options: I could download somebody else's launcher, or create a simple one with absolutely no frills. Unless, you would consider it a frill when the launcher closes itself after starting the target software.

Precaution: I take security seriously. Use of the Portable Apps or the standalone version of programs is predicated on the assumption that the software does not attempt to access the privileged area of the operating system. You should note that the network-accessing programs may be detected by the system firewall, if enabled. That means that the programs accessing network would still pose as much risk as any admin installed programs. There is no immunity without vigilance. For me, the appeal of the Portable Apps is leaving no residual files when the program folders are deleted, including but not limited to .profile, .ini, .cache, or passwords of all kinds.

### Excel data aggregator

Inspiration:

Observation:

Weighing Options:

Precaution:
