export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const LOCAL = process.env.NEXT_PUBLIC_BACKEND_LOCAL_PORTS === 'true';

// Service base URLs
// In AWS/Docker: all go through the ALB via BASE_URL
// Locally with native Java: each service runs on its own port
export const USER_SERVICE_URL = LOCAL ? 'http://localhost:8082/api/user/v1' : `${BASE_URL}/api/user/v1`;
export const ENTITY_SERVICE_URL = LOCAL ? 'http://localhost:8087/api/entity/v1' : `${BASE_URL}/api/entity/v1`;
export const SEARCH_SERVICE_URL = LOCAL ? 'http://localhost:8081/api/search/v1' : `${BASE_URL}/api/search/v1`;
export const SUBMISSION_SERVICE_URL = LOCAL ? 'http://localhost:8083/api/submission/v1' : `${BASE_URL}/api/submission/v1`;
export const REPORT_SERVICE_URL = LOCAL ? 'http://localhost:8084/api/report/v1' : `${BASE_URL}/api/report/v1`;
export const DOWNLOAD_SERVICE_URL = LOCAL ? 'http://localhost:8086/api/download/v1' : `${BASE_URL}/api/download/v1`;

// API URLS
/**
 * Search Calls
 */

// HOMEPAGE API CALL
export const GET_FUNDING = `${ENTITY_SERVICE_URL}/getFunding`;
export const GET_NEWS = `${ENTITY_SERVICE_URL}/getNews`;
export const GET_EVENTS = `${ENTITY_SERVICE_URL}/getEvents`;
export const GET_STATS = `${ENTITY_SERVICE_URL}/getCenterStats`;
export const GET_CONTENT_UPDATES = `${ENTITY_SERVICE_URL}/getHomepageContent`;
export const GET_ALL_FUNDING = `${ENTITY_SERVICE_URL}/getAllFunding`;
export const GET_ALL_NEWS = `${ENTITY_SERVICE_URL}/getAllNews`;
export const GET_ALL_EVENTS = `${ENTITY_SERVICE_URL}/getAllEvents`;

// STUDY EXPLORER API CALLS
export const SEARCH_STUDIES = `${SEARCH_SERVICE_URL}/studies`;
export const GET_STUDY = `${ENTITY_SERVICE_URL}/study/getStudy?studyId=`;
export const GET_STUDY_DOCUMENTS = `${ENTITY_SERVICE_URL}/study/getDocuments?studyId=`;
export const GET_STUDY_DATASETS = `${ENTITY_SERVICE_URL}/study/getDatasets?studyId=`;
export const GET_FACETS = `${ENTITY_SERVICE_URL}/search/getFacets`;
export const GET_PROPERTIES = `${ENTITY_SERVICE_URL}/search/getProps`;
export const GET_AUTOCOMPLETE = `${SEARCH_SERVICE_URL}/studies/autocomplete?q=`;
export const GET_VARIABLES = `${ENTITY_SERVICE_URL}/search/variables`;
export const GET_VARIABLES_BY_STUDY = `${ENTITY_SERVICE_URL}/search/variables?studyId=`;
export const SEARCH_VARIABLES = `${SEARCH_SERVICE_URL}/variables`;

// USER SUPPORT REQUEST FORM API CALL
export const POST_SUPPORT_REQUEST = `${USER_SERVICE_URL}/support-request/submit`;
export const GET_REQUEST_TYPES = `${USER_SERVICE_URL}/support-request/request-types`;

// SUPPORT DASHBOARD API CALL
export const GET_ALL_SUPPORT_REQUEST = `${USER_SERVICE_URL}/support-request/all-support-requests?status=`;
export const GET_SUPPORT_REQUEST_BY_ID = `${USER_SERVICE_URL}/support-request/`;


// INTERNAL DASHBOARD API CALL
export const GET_SUPPORT_REQUEST_BY_ID_INTERNAL = `${USER_SERVICE_URL}/support-request/officer/`;

// SUPPORT TICKET API CALL
export const GET_ALL_SUPPORT_STATUSES = `${USER_SERVICE_URL}/support-request/all-statuses`;
export const GET_ALL_SUPPORT_SEVERITY = `${USER_SERVICE_URL}/support-request/all-severity`;
export const GET_ALL_SUPPORT_RESOLUTION_TYPES = `${USER_SERVICE_URL}/support-request/all-resolution-types`;
export const UPDATE_DETAILED_SUPPORT_TICKET = `${USER_SERVICE_URL}/support-request/update-support-request/`;
export const GET_ALL_ASSIGNEES = `${USER_SERVICE_URL}/support-request/all-assignees`;

// SUBMITTER DASHBOARD API CALL
export const GET_SUBMITTER_SUBMISSIONS = `${SUBMISSION_SERVICE_URL}/getSubmissions`;
export const DELETE_SUBMISSION = `${SUBMISSION_SERVICE_URL}/deleteSubmission?submissionId=`;

// // DATA INGEST APIs
export const GET_STUDIES = `${SUBMISSION_SERVICE_URL}/getStudies`;
export const POST_DI_SUBMISSION = `${SUBMISSION_SERVICE_URL}/create-submission?studyId=`;
export const GET_CATEGORIES = `${SUBMISSION_SERVICE_URL}/getCategories`;
export const POST_DI_UPLOAD = `${SUBMISSION_SERVICE_URL}/uploadFiles/uploadFile?submissionId=`;
export const DELETE_DI_FILE = `${SUBMISSION_SERVICE_URL}/deleteFile?fileId=`;
export const GET_SUBMISSION_INFO = `${SUBMISSION_SERVICE_URL}/submissionInfo?submissionId=`;
export const GET_UPLOADED_FILES = `${SUBMISSION_SERVICE_URL}/uploadFiles/getFiles?submissionId=`;
export const POST_CREATE_BUNDLES = `${SUBMISSION_SERVICE_URL}/uploadFiles/createBundles?submissionId=`;
export const GET_BUNDLES = `${SUBMISSION_SERVICE_URL}/bundle/get?submissionId=`;
export const POST_BUNDLES = `${SUBMISSION_SERVICE_URL}/bundle/update`;
export const POST_VALIDATE_SUBMISSION = `${SUBMISSION_SERVICE_URL}/validateFiles/validate?submissionId=`;
export const GET_VALIDATION_RESULTS = `${SUBMISSION_SERVICE_URL}/validateFiles/getResults?submissionId=`;
export const PUT_REPLACE_FILE = `${SUBMISSION_SERVICE_URL}/replaceFile?fileId=`;
export const POST_SUBMIT_SUBMISSION = `${SUBMISSION_SERVICE_URL}/reviewAndSubmit/submit?submissionId=`;
export const GET_BUNDLE_FILES = `${SUBMISSION_SERVICE_URL}/bundle/getFiles?fileId=`;
export const DELETE_BUNDLE = `${SUBMISSION_SERVICE_URL}/bundle/delete?fileId=`;
export const POST_DI_ACKNOWLEDGEMENT = `${SUBMISSION_SERVICE_URL}/validateFiles/acknowledge?submit=`;
export const POST_DI_MULTI_UPLOAD = `${SUBMISSION_SERVICE_URL}/uploadFiles/multiple?submissionId=`;
export const GET_DOWNLOAD_BY_FILE = `${SUBMISSION_SERVICE_URL}/download/validationErrorsByFile?fileId=`;
export const GET_DOWNLOAD_BY_SUBMISSION = `${SUBMISSION_SERVICE_URL}/download/validationErrorsBySubmission?submissionId=`;
export const POST_SAVE_VALIDATION = `${SUBMISSION_SERVICE_URL}/validateFiles/acknowledge?submit=false`;
export const POST_PREVIOUS_PAGE = `${SUBMISSION_SERVICE_URL}/bundle/previousPage?submissionId=`;
export const DELETE_MULTIPLE_DI = `${SUBMISSION_SERVICE_URL}/deleteFiles?fileIds=`;

// INTERNAL DASHBOARD
export const DOWNLOAD_SUPPORT_REQUEST_REPORT = `${USER_SERVICE_URL}/support-request/download-support-request-report`;

// METRICS REPORTS APIS
export const GET_HUB_CONTENT = `${REPORT_SERVICE_URL}/hubContent?aggBy=[aggBy]&reportId=[reportId]`;
export const GET_HUB_CONTENT_CSV = `${REPORT_SERVICE_URL}/download/hubContent?aggBy=[aggBy]&reportId=[reportId]`;
export const GET_REPORT_IDS = `${REPORT_SERVICE_URL}/hubContentReportDates`;
export const GET_HARMONIZATION_REPORT_IDS = `${REPORT_SERVICE_URL}/getDataHarmonizationReportIds`;
export const GET_HARMONIZATION_OUTCOMES = `${REPORT_SERVICE_URL}/getHarmonizationMetrics?aggBy=[aggBy]&reportId=[reportId]`;
export const GET_HARMONIZATION_OUTCOMES_CSV = `${REPORT_SERVICE_URL}/getHarmonizationMetricsCSV?aggBy=[aggBy]&reportId=[reportId]`;
export const GET_SUBMISSION_ACTIVITIES = `${REPORT_SERVICE_URL}/submissionMetricsByAggregate?aggBy=[aggBy]&startDate=[startDate]&endDate=[endDate]`;
export const GET_SUBMISSION_ACTIVITIES_CSV = `${REPORT_SERVICE_URL}/submissionMetricsCSV?aggBy=[aggBy]&startDate=[startDate]&endDate=[endDate]`;
export const GET_USER_POPULATION = `${REPORT_SERVICE_URL}/userMetricsByAggregate?aggBy=[aggBy]&startDate=[startDate]&endDate=[endDate]`;
export const GET_USER_POPULATION_CSV = `${REPORT_SERVICE_URL}/userMetricsCSV?aggBy=[aggBy]&startDate=[startDate]&endDate=[endDate]`;
export const GET_USER_ACTIVITIES = `${REPORT_SERVICE_URL}/userActivities?startDate=[startDate]&endDate=[endDate]`;
export const GET_USER_ACTIVITIES_CSV = `${REPORT_SERVICE_URL}/userActivitiesCSV?startDate=[startDate]&endDate=[endDate]`;

// USER REGISTRATION
export const GET_RESEARCHER_LEVELS = `${USER_SERVICE_URL}/user/researcher-levels`;
export const GET_CENTERS = `${USER_SERVICE_URL}/user/centers`;
export const GET_APPROVED_INSTITUTIONS = `${USER_SERVICE_URL}/user/approved-institutions`;
export const POST_USER_REGISTRATION = `${USER_SERVICE_URL}/user/user-registration`;
export const POST_INSTITUTION = `${USER_SERVICE_URL}/user/create-institution`;
export const ALL_STATES = `${USER_SERVICE_URL}/user/states`;
export const ALL_COUNTRIES = `${USER_SERVICE_URL}/user/countries`;
export const GET_INSTITUTIONS_TYPES = `${USER_SERVICE_URL}/user/institution-types`;
export const GET_REFERRERS = `${USER_SERVICE_URL}/user/referrer-types`;

// USER DASHBOARD
export const GET_ALL_USERS = `${USER_SERVICE_URL}/user/admin/users?status=`;
export const GET_ALL_USER_ROLES = `${USER_SERVICE_URL}/user/admin/roles`;
export const GET_USER_BY_ID = `${USER_SERVICE_URL}/user/admin/`;
export const UPDATE_USER_INFO_BY_ID = `${USER_SERVICE_URL}/user/admin/update/`;
export const GET_ALL_GENERAL_STATUSES = `${USER_SERVICE_URL}/user/admin/general-statuses`;

// USER PROFILE
export const UPDATE_USER_PROFILE = `${USER_SERVICE_URL}/user/editProfile`;

// SYSTEM SETTINGS (backend direct)
export const GET_PUBLIC_SYSTEM_SETTINGS = `${USER_SERVICE_URL}/system-settings/public`;
export const GET_ADMIN_SYSTEM_SETTINGS = `${USER_SERVICE_URL}/system-settings/admin`;
export const PUT_TOP_BANNER_SETTING = `${USER_SERVICE_URL}/system-settings/admin/top-banner`;

// STUDY REGISTRATION FORM
export const GET_CODELISTS = `${ENTITY_SERVICE_URL}/study/registrationCodelists`;
export const GET_STUDY_ENTITIES = `${ENTITY_SERVICE_URL}/study/getRegistrationProperties`;
export const GET_STUDY_VALUES = `${SUBMISSION_SERVICE_URL}/study/getValues?studyId=[studyId]`;
export const PUT_STUDY_REGISTRATION = `${SUBMISSION_SERVICE_URL}/study/[userType]/edit?shouldSubmit=`;

// STUDY REGISTRATION DASHBOARD
export const UPLOAD_STUDY_REG_DASH = `${SUBMISSION_SERVICE_URL}/study/[userType]/create?shouldSubmit=`;
export const DELETE_STUDY = `${SUBMISSION_SERVICE_URL}/study/delete?studyId=[studyId]&deleteStudy=true`;
export const DELETE_STUDY_FILES = `${SUBMISSION_SERVICE_URL}/study/delete?studyId=[studyId]&deleteStudy=false`;
export const GET_CURATOR_STUDIES = `${SUBMISSION_SERVICE_URL}/study/curator/studies`;
export const GET_CENTER_STUDIES = `${SUBMISSION_SERVICE_URL}/study/center/studies`;

// USER AUTH
export const GET_INFO_BY_COOKIE = `${USER_SERVICE_URL}/user/info`;
export const UPDATE_SESSION_TOKEN = `${USER_SERVICE_URL}/refresh/token`;
export const USER_LOGOUT = `${USER_SERVICE_URL}/logout`;

// CURATOR DASHBOARD
export const GET_STUDY_FILE_SUBMISSIONS = `${SUBMISSION_SERVICE_URL}/curator/getSubmissions`;
export const GET_STUDY_FILE_SUBMISSION_FILES = `${SUBMISSION_SERVICE_URL}/curator/getFilesBySubm?submissionId=`;
export const POST_STUDY_FILE_SUBMISSION_REVIEW = `${SUBMISSION_SERVICE_URL}/curator/processFiles`;
export const DOWNLOAD_STUDY_FILES = `${SUBMISSION_SERVICE_URL}/curator/all-submission-files?submissionId=`;
export const DOWNLOAD_WEEKLY_REPORT = `${REPORT_SERVICE_URL}/download/getWeeklyStudyByFileReport`;
export const GET_UPLOAD_PORTAL_DOWNLOADS = `${SUBMISSION_SERVICE_URL}/uploadPortal/curator/dashboard`;
export const DELETE_UPLOAD_FILE = `${SUBMISSION_SERVICE_URL}/uploadPortal/curator/dashboard/delete?uploadId=`;

// STUDY OVERVIEW
export const GET_DATA_FILE_CONTENT = `${DOWNLOAD_SERVICE_URL}/download/datafile?fileId=`;

// VARIABLE OVERVIEW
export const GET_VARIABLE = `${ENTITY_SERVICE_URL}/variable/overview?variableId=`;
export const GET_PERMISSIBLE_VALUES = `${ENTITY_SERVICE_URL}/variable/permissibleValues?variableId=`;
export const GET_LINKED_STUDIES = `${ENTITY_SERVICE_URL}/variable/linkedStudies?variableId=`;

// NEWS ARTICLES
export const GET_NEWS_ARTICLE = `${ENTITY_SERVICE_URL}/getNews/`;

// NEWSLETTERS
export const GET_NEWSLETTERS = `${ENTITY_SERVICE_URL}/getNewsletters`;

// STUDY PORTAL
export const GET_PORTAL_STUDIES = `${SUBMISSION_SERVICE_URL}/uploadPortal/getStudies`;
export const UPLOAD_PORTAL_ZIP = `${SUBMISSION_SERVICE_URL}/uploadPortal/upload`;

/**
 * --------------------------------------------- NEXT JS -----------------------------------------
 */
export const SUPPORT = `/api/launch/Support/SupportForm`;
export const SUPPORTID = `/api/launch/Support/SupportId?id=[id]`;
export const DI_SUBMISSION = `/api/launch/DataIngest/DataIngestSubmission`;
export const DI_UPLOAD = `/api/launch/DataIngest/DataIngestUpload`;
export const DI_DELETE = `/api/launch/DataIngest/DataIngestDelete`;
export const DI_CREATE_BUNDLES = `/api/launch/DataIngest/DataIngestCreateBundles`;
export const DI_UPDATE_BUNDLES = `/api/launch/DataIngest/DataIngestUpdateBundles`;
export const DI_VALIDATE_SUBMISSION = `/api/launch/DataIngest/DataIngestValidateSubmission`;
export const DI_GET_VALIDATION = `/api/launch/DataIngest/DataIngestGetValidationResults`;
export const DI_REPLACE = `/api/launch/DataIngest/DataIngestReplaceFile`;
export const DI_SUBMIT = `/api/launch/DataIngest/DataIngestSubmit`;
export const SUPPORTASSIGNEE = `/api/launch/SupportAssignee`;
export const USER_REGISTRATION = '/api/launch/UserRegistration/UserRegistration';
export const ADD_INSTITUTION = '/api/launch/Institution/AddInstitution';
export const GET_USER_PROFILE = '/api/launch/GetUserProfile/GetUserProfile?session=[id]';
export const GET_USER_INFO = '/api/launch/UserDashboard/UserDashboard?id=[id]';
export const UPDATE_USER_INFO = '/api/launch/UserDashboard/PutUserDashboard?id=[id]';
export const UPDATE_STUDY_REGISTRATION = `/api/launch/StudyRegistration/UpdateStudyInfo?userType=[userType]&shouldSubmit=`;
export const UPLOAD_STUDY_REG = '/api/launch/StudyRegistrationDash/StudyRegistrationDashUpload';
export const DI_GET_BUNDLE_FILES = '/api/launch/DataIngest/DataIngestGetFiles';
export const DI_DELETE_BUNDLE = '/api/launch/DataIngest/DataIngestDeleteBundle';
export const DI_SEND_ACKNOWLEDGEMENT = '/api/launch/DataIngest/DataIngestAcknowledgement';
export const SUBMITTER_DELETE_SUBMISSION = '/api/launch/SubmitterDash/SubmitterDashDeleteSubmission';
export const LOGIN = `/api/launch/Login/login`;
export const DI_MULTI_UPLOAD = '/api/launch/DataIngest/DataIngestMultiUpload';
export const REFRESH_TOKEN = '/api/launch/SessionToken/SessionToken';
export const DI_SAVE_VALIDATION = '/api/launch/DataIngest/DataIngestSaveValidation';
export const DI_PREVIOUS_PAGE = `/api/launch/DataIngest/DataIngestPreviousPage`;
export const SUBMIT_STUDY_FILE_REVIEW = `/api/launch/StudyFileSubmission/SubmitStudyFileReview`;
export const DELETE_MULTIPLE_FILES = `/api/launch/DataIngest/DataIngestDeleteMultiple`;
export const EXPLORER_AUTOCOMPLETE = `/api/launch/StudyExplorer/StudyExplorerAutocomplete`;
export const GET_RESEARCHER_LEVEL_VALUES = '/api/launch/GetResearcherLevels/GetResearcherLevels';
export const GET_INSTITUTION_VALUES = '/api/launch/GetInstitutions/GetInstitutions';
export const EDIT_USER_PROFILE = '/api/launch/UserProfile/PutUserProfile';
export const CHECK_DOWNLOAD_LINK = '/api/launch/Downloads/checkDownloadLink?downloadLink=';
export const STUDY_PORTAL_UPLOAD = '/api/launch/StudyPortal/StudyPortalUpload';
export const STUDY_PORTAL_GET_STUDIES = '/api/launch/StudyPortal/GetStudies';
export const UPLOAD_FILE_DELETION = '/api/launch/UploadPortal/UploadFileDeletion';
export const APPROVED_STUDY_FILES_DELETION = `/api/launch/StudyRegistration/StudyFilesDeletion?studyId=[studyId]`;
export const STUDY_DELETION = `/api/launch/StudyRegistration/StudyDeletion?studyId=[studyId]`;
export const GET_STUDY_VARIABLES = `/api/launch/StudyExplorer/getStudyVariables?studyId=`;
export const GET_METADATA_DICT_FILE = `/api/launch/StudyOverview/getMetadataDict?fileId=`;

// SYSTEM SETTINGS (BFF)
export const PUBLIC_SYSTEM_SETTINGS = `/api/launch/SystemSettings/PublicSettings`;
export const ADMIN_SYSTEM_SETTINGS = `/api/launch/SystemSettings/AdminSettings`;
export const UPDATE_TOP_BANNER = `/api/launch/SystemSettings/UpdateTopBanner`;

// Downloads: baseURL + apiUrl
export const GET_DOCUMENT = `${DOWNLOAD_SERVICE_URL}/download/document?fileId=[fileID]&studyId=[studyID]`;
export const GET_DATA_FILE = `${DOWNLOAD_SERVICE_URL}/download/datafile?fileId=`;
export const GET_ALL_DOCUMENTS = `${DOWNLOAD_SERVICE_URL}/download/study-documents?studyId=[studyID]`;
export const GET_RESOURCE_CENTER_BUCKET = `/resources/`;
export const GET_UPLOAD_FILE = `${DOWNLOAD_SERVICE_URL}/download/uploadPortal/file?uploadId=[uploadID]`;

// Testing new auth errors
export const TESTINGAUTH = `api/launch/test`;
export const LOGOUT = `/api/launch/Logout/Logout`;
