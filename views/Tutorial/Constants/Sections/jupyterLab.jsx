import classes from '../../Tutorial.module.scss';
import Image from 'next/legacy/image';
import figure1JupyterLab from '../../images/JupyterLab/figure1JupyterLab.png';
import figure2JupyterLab from '../../images/JupyterLab/figure2JupyterLab.png';
import figure3JupyterLab from '../../images/JupyterLab/figure3JupyterLab.png';
import figure4JupyterLab from '../../images/JupyterLab/figure4JupyterLab.png';
import figure5JupyterLab from '../../images/JupyterLab/figure5JupyterLab.png';
import figure6JupyterLab from '../../images/JupyterLab/figure6JupyterLab.png';
import figure7JupyterLab from '../../images/JupyterLab/figure7JupyterLab.png';

export const jupyterLab = {
    mainTitle: 'JupyterLab',
    state: 'jupyterLab',
    sections: [
        {
            title: 'General',
            id: 'general-jupyter',
            state: 'jupyterLab',
            content: (
                <>
                    <div className={classes.tutorialImg}>
                        <Image src={figure1JupyterLab} alt="Figure 1: Labeled Jupyter Notebook Interface" />
                    </div>
                    <figcaption className={classes.figureCaption}>Figure 1: Labeled Jupyter Notebook Interface</figcaption>
                    <p className={classes.tutorialListItem}>The main elements of JupyterLab editor are:</p>
                    <ol>
                        <li className={classes.tutorialListItem}>
                            <b>Notebook: </b>A document containing analysis code, outputs, and any additional markdown or text.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <b>Cell: </b>A single section of a notebook where to enter code, markdown, or text.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <b>Toolbar: </b>Perform the most common notebook actions, including:
                            <ul>
                                <li>Save</li>
                                <li>Insert cell below</li>
                                <li>Cut selected cell</li>
                                <li>Copy selected cell</li>
                                <li>Paste from clipboard</li>
                                <li>Run selected cell</li>
                                <li>Interrupt the kernel</li>
                                <li>Restart the kernel</li>
                                <li>Restart the kernel and run all cells</li>
                                <li>Change cell type (i.e. Code, Markdown, Raw)</li>
                                <li>Launch terminal</li>
                            </ul>
                        </li>
                        <li className={classes.tutorialListItem}>
                            <b>Environment: </b>Displays the current notebook kernel type.
                        </li>
                        <li className={classes.tutorialListItem}>
                            <b>File Browser: </b>Displays lists of folders, notebooks, and other files.
                            <ul>
                                <li>The Personal Studio environment is a private. personal Amazon EFS directory</li>
                            </ul>
                        </li>
                        <li className={classes.tutorialListItem}>
                            <b>Left sidebar: </b>Contains tabs to access the following functionalities.
                            <ul>
                                <li>
                                    <b>File Browser: </b>Displays lists of folders, notebooks, and other files.
                                </li>
                                <li>
                                    <b>Running Terminals and Kernels: </b> View current kernels and terminals running in JupyterLab.
                                    Optionally shut down all or select resources (i.e., notebooks, terminals, kernels, apps, and instances).
                                </li>
                                <li>
                                    <b>Git: </b>Connects to a Git repository for Git tool and operation access.
                                </li>
                                <li>
                                    <b>Table of Contents: </b>Automatically generated for each notebook, Markdown file, or Python file open
                                    to navigate the document’s structure with clickable entries.
                                </li>
                                <li>
                                    <b>Extension Manager: </b>Enables and manages third-party JupyterLab extensions.
                                </li>
                                <li>
                                    <b>Jupyter AI: </b>A JupyterLab tool to explore generative AI models and integrate them into notebooks.
                                </li>
                            </ul>
                        </li>
                    </ol>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Create and Launch a JupyterLab Space',
            id: 'create-space',
            state: 'jupyterLab',
            content: (
                <>
                    <p className={classes.tutorialListItem}>
                        The default workspace environment is a ml.t3.medium (2 vCPU, 4 GiB memory) instance type.
                    </p>
                    <p className={classes.tutorialListItem}>To create a new JupyterLab space:</p>
                    <ol>
                        <li className={classes.tutorialListItem}>
                            When the Workbench is launched, select “JupyterLab” from the “Overview” section, or select “JupyterLab” from the
                            “Applications” in the left panel (Figure 2).
                        </li>
                        <div className={classes.tutorialImg}>
                            <Image src={figure2JupyterLab} alt="Figure 2: Workbench appliciation highlighting JupyterLab" />
                        </div>
                        <figcaption className={classes.figureCaption}>Figure 2: Workbench Applications Highlighting JupyterLab</figcaption>
                        <li className={classes.tutorialListItem}>
                            Select "+ Create JupyterLab space" in the upper right corner of the JupyterLab page
                            <ul>
                                <li>
                                    In the “Create JupyterLab space” dialog, specify a name for the space in the “Name” field. To finish,
                                    click “Create space.”
                                </li>
                                <li>
                                    <b>Note:</b> Because the platform is shared, workspaces must have a unique name. If the workspace name
                                    already exists, the following error will appear at the bottom of the page (Figure 3)
                                </li>
                            </ul>
                            <br />
                            <div className={classes.tutorialImg}>
                                <Image src={figure3JupyterLab} alt="Figure 3: Error Message for workspace name exists" />
                            </div>
                            <figcaption className={classes.figureCaption}>Figure 3: Error Message for Workspace Name Exists</figcaption>
                        </li>
                    </ol>
                    <p>To launch a JupyterLab space:</p>
                    <ol>
                        <li className={classes.tutorialListItem}>
                            From the Workbench Home page, select “JupyterLab” from the Overview section, or select “JupyterLab” from
                            “Applications” in the left panel (Figure 2).
                        </li>
                        <li className={classes.tutorialListItem}>
                            Select “Run” in the Action column of the JupyterLab space to start the workspace (Figure 4). This may take up to
                            a minute to start.
                        </li>
                        <div className={classes.tutorialImg}>
                            <Image src={figure4JupyterLab} alt="Figure 4: Start Running JupyterLab Space" />
                        </div>
                        <figcaption className={classes.figureCaption}>Figure 4: Start Running JupyterLab Space</figcaption>
                        <li className={classes.tutorialListItem}>
                            Once the status changes to “Running”, select the “Open” icon in the Action column to launch JupyterLab in a new
                            tab (Figure 5).
                        </li>
                        <div className={classes.tutorialImg}>
                            <Image src={figure5JupyterLab} alt="Figure 5: Open JupyterLab Space" />
                        </div>
                        <figcaption className={classes.figureCaption}>Figure 5: Open JupyterLab Space</figcaption>
                        <p className={classes.tutorialListItem}>To create a new notebook:</p>
                        <ol>
                            <li className={classes.tutorialListItem}>
                                From the landing page, select “File,” “New,” and “Notebook” (Figure 6).
                                <ul>
                                    <li>
                                        In the “Select Kernel” dialog, select a kernel on the dropdown menu. To finish, click “Select”,
                                        which launches the notebook.
                                    </li>
                                </ul>
                            </li>
                            <div className={classes.tutorialImg}>
                                <Image src={figure6JupyterLab} alt="Figure 6: Launch Notebook from File Menu" />
                            </div>
                            <figcaption className={classes.figureCaption}>Figure 6: Launch Notebook from File Menu</figcaption>
                            <li className={classes.tutorialListItem}>
                                From the Launcher page, click a preferred kernel in the Notebook section (Figure 7).
                            </li>
                            <div className={classes.tutorialImg}>
                                <Image src={figure7JupyterLab} alt="Figure 7: Launch Notebook Using Launcher" />
                            </div>
                            <figcaption className={classes.figureCaption}>Figure 7: Launch Notebook Using Launcher</figcaption>
                        </ol>
                    </ol>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Upload and Download Files',
            id: 'upload-download',
            state: 'jupyterLab',
            content: (
                <>
                    <p className={classes.tutorialListItem}>To upload files from a local machine into a JupyterLab space:</p>
                    <ol>
                        <li className={classes.tutorialListItem}>In the left sidebar, choose the “File Browser” icon.</li>
                        <li className={classes.tutorialListItem}>In the File Browser, choose the "Upload Files” icon.</li>
                        <li className={classes.tutorialListItem}>Select the files to upload and choose “Open.”</li>
                        <li className={classes.tutorialListItem}>
                            Once the file appears in the home folder, double-click the file to open it in a new tab.
                        </li>
                    </ol>
                    <p className={classes.tutorialListItem}>To download a file locally:</p>
                    <ol>
                        <li className={classes.tutorialListItem}>In the left sidebar, choose the “File Browser” icon.</li>
                        <li className={classes.tutorialListItem}>Right click the file and select “Download.”</li>
                    </ol>
                    <p className={classes.tutorialListItem}>To download an entire folder locally:</p>
                    <ol>
                        <li className={classes.tutorialListItem}>
                            From the menu, choose “File,” “New,” and “Terminal”, which will launch a Terminal in a new JupyterLab tab.
                        </li>
                        <li className={classes.tutorialListItem}>
                            Type the following command replacing <span className={classes.codeBlock}>folder_name</span> and{' '}
                            <span className={classes.codeBlock}>/path/to/folder: zip -r -X folder_name.zip /path/to/folder </span>
                        </li>
                        <li className={classes.tutorialListItem}>
                            Once the folder is zipped and it appears in the File Browser, right click the .zip file and select “Download.”
                        </li>
                    </ol>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Clone a Git Repository',
            id: 'clone-git',
            state: 'jupyterLab',
            content: (
                <>
                    <p className={classes.tutorialListItem}>
                        Git repositories can be cloned into the JupyterLab home folder using the following steps:
                    </p>
                    <ol>
                        <li className={classes.tutorialListItem}>Select the Git icon in the left sidebar.</li>
                        <li className={classes.tutorialListItem}>Choose “Clone a Repository.”</li>
                        <li className={classes.tutorialListItem}>
                            In the Clone Git Repository window, enter the Git URL (for example,
                            {/* eslint-disable-next-line max-len */}
                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/aws/amazon-sagemaker-examples.git">
                                {' '}
                                https://github.com/aws/amazon-sagemaker-examples.git
                            </a>
                            )
                        </li>
                        <li className={classes.tutorialListItem}>
                            Under “Project directory to clone into,” enter the path to the local directory where the cloned directory should
                            exist, otherwise Studio will clone the repository into the home directory.
                        </li>
                        <li className={classes.tutorialListItem}>
                            Choose “Clone,” which will automatically open a new terminal window and clone the repository. This may take up
                            to a minute depending on the repository size.
                        </li>
                        <li className={classes.tutorialListItem}>
                            If the repository requires credentials, a prompt will appear to enter a username and personal GitHub account
                            access token.
                        </li>
                        <li className={classes.tutorialListItem}>
                            When complete, the File Browser will open, displaying the cloned repository.
                        </li>
                        <li className={classes.tutorialListItem}>
                            Choose the Git icon to view the Git user interface, which tracks the repository.
                        </li>
                        <li className={classes.tutorialListItem}>
                            To track a different repository, open the repository in the file browser and click the Git icon.
                        </li>
                    </ol>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Create a Persistent Conda Environment',
            id: 'conda-environment',
            state: 'jupyterLab',
            content: (
                <>
                    <p className={classes.tutorialListItem}>
                        Environments can be customized by installing and removing extensions and packages as needed. Any installed
                        extensions and packages installed on the environment will persist. To create persistent conda environments in the
                        JupyterLab application, use the following steps:
                    </p>
                    <ol>
                        <li className={classes.tutorialListItem}>Open a JupyterLab space.</li>
                        <li className={classes.tutorialListItem}>From the landing page, select “File,” “New,” and “Terminal”.</li>
                        <li className={classes.tutorialListItem}>
                            Within the terminal, create a new conda environment, replacing myenv with the desired environment name: <br />
                            <span className={classes.codeBlock}>conda create -n myenv</span>
                        </li>
                        <li className={classes.tutorialListItem}>
                            Activate the environment
                            <br />
                            <span className={classes.codeBlock}>conda activate myenv</span>
                        </li>
                        <li className={classes.tutorialListItem}>
                            Install any necessary packages for the environment, for example:
                            <br />
                            <span className={classes.codeBlock}>conda install numpy pandas</span>
                        </li>
                        <li className={classes.tutorialListItem}>
                            Install the ipykernel to create a kernel option. This step can be skipped if it has already been installed:
                            <br />
                            <span className={classes.codeBlock}>conda install ipykernel</span>
                        </li>
                        <li className={classes.tutorialListItem}>
                            Add the new conda environment to the Jupyter kernel, changing the{' '}
                            <span className={classes.codeBlock}>--display-name</span> option as preferred:
                            <br />
                            <span className={classes.codeBlock}>
                                python -m ipykernel install –-user --name myenv --display-name "MyEnvironment"
                            </span>
                        </li>
                        <li className={classes.tutorialListItem}>
                            Verify installation of the kernel:
                            <br />
                            <span className={classes.codeBlock}>jupyter kernelspec list</span>
                        </li>
                        <li className={classes.tutorialListItem}>
                            When a notebook is launched, the new kernel should appear. If the kernel is not listed, close the tab and reopen
                            the JupyterLab space.
                        </li>
                    </ol>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Access Public Data',
            id: 'access-public-data',
            state: 'jupyterLab',
            content: (
                <>
                    <p className={classes.tutorialListItem}>
                        To access curated public and synthetic datasets on the site’s Data Access page, follow the
                        <a target="_blank" rel="noopener noreferrer" href="/tutorial?tutorial=publicData">
                            {' '}
                            Public Data Tutorial
                        </a>
                    </p>
                    <p className={classes.tutorialListItem}>
                        Datasets from the{' '}
                        <a target="_blank" rel="noopner noreferrer" href="https://registry.opendata.aws/">
                            {' '}
                            AWS Registry of Open Data
                        </a>
                        , an AWS-hosted repository of more than 400 publicly available datasets, can be copied into a JupyterLab environment
                        using the following steps:
                    </p>
                    <ol>
                        <li className={classes.tutorialListItem}>
                            Identify a dataset of interest and find the associated Amazon Resource Name (ARN).
                            <ul>
                                <li>
                                    For example:{' '}
                                    <a target="_blank" rel="noopener noreferrer" href="https://registry.opendata.aws/ncbi-sra/">
                                        NIH NCBI Sequence Read Archive (SRA)
                                    </a>
                                </li>
                                <li>
                                    ARN: <span className={classes.codeBlock}>arn:aws:s3:::sra-pub-src-1</span>
                                </li>
                                <li>
                                    The bucket name is <span className={classes.codeBlock}>sra-pub-src-1</span>
                                </li>
                            </ul>
                        </li>
                        <li className={classes.tutorialListItem}>
                            From the JupyterLab landing page, select “File,” “New,” then “Terminal.”
                        </li>
                        <li className={classes.tutorialListItem}>
                            Enter the following command: <span className={classes.codeBlock}>aws s3 sync s3://sra-pub-src-1 .</span>
                        </li>
                        <li className={classes.tutorialListItem}>
                            Replace <span className={classes.codeBlock}>sra-pub-src-1</span> with a selected dataset bucket name.
                        </li>
                    </ol>
                </>
            ),
            subSections: [],
        },
        {
            title: 'Change Environment',
            id: 'change-environment',
            state: 'jupyterLab',
            content: (
                <>
                    <p className={classes.tutorialListItem}>
                        Notebooks launch with the minimum instance type available by default. The minimum instance type is appropriate for
                        most tasks, however, a larger instance can be requested by submitting a{' '}
                        <a target="_blank" rel="noopener noreferrer" href="/support">
                            Support Request.
                        </a>{' '}
                        Follow the instructions in the{' '}
                        <a target="_blank" rel="noopener noreferrer" href="/tutorial?tutorial=userSupport">
                            User Support Requests Tutorial
                        </a>{' '}
                        and select “Workbench Support” when choosing a Request Type. Please provide as much detail as possible in the
                        request for the support team to determine the best suitable environment. For more detailed information about
                        available instance types and their performance capabilities, see{' '}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://docs.aws.amazon.com/sagemaker/latest/dg/notebooks-available-instance-types.html"
                        >
                            Available Studio Instance Types.
                        </a>{' '}
                    </p>
                </>
            ),
            subSections: [],
        },
        {
            title: 'File Sync',
            id: 'file-sync',
            state: 'jupyterLab',
            content: (
                <>
                    <p className={classes.tutorialListItem}>
                        If an added Workbench file does not appear in the File Browser of JupyterLab, the workspace should be resynced.
                        Close the JupyterLab tab, and refresh the My Approved Data page. Then, follow the steps to relaunch the JupyterLab
                        page. If the files still do not appear, the workspace may need to be manually synced with the following steps:
                    </p>
                    <ol>
                        <li className={classes.tutorialListItem}>From the File menu, click “File,” “New,” and “Terminal.”</li>
                        <li className={classes.tutorialListItem}>
                            Enter the following into the Terminal: <span className={classes.codeBlock}>./s3sync.sh</span>
                        </li>
                    </ol>
                    <p className={classes.tutorialListItem}>
                        If the files in a workspace are still missing, please submit a{' '}
                        <a target="_blank" rel="noopener noreferrer" href="/support">
                            Support Request
                        </a>
                        .
                    </p>
                </>
            ),
            subSections: [],
        },
    ],
};
