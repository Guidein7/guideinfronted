
const config = {
  api: {
    baseURL: 'https://guidein-backend-guidein-backend.lomaem.easypanel.host', //' https://burro-up-panda.ngrok-free.app', //''http://localhost:8080',//
    jobSeeker: {
      register:'/api/guidein/v1/auth/register',
      verification:'/api/guidein/v1/auth/register/otpvalidate',
      resendOtp:'/api/guidein/v1/auth/register/sendotp',
      login: '/api/guidein/v1/auth/authenticate',
      forgotPassword:'/api/guidein/v1/auth/register/sendotp',
      resetPassword:'/api/guidein/v1/auth/register/forgetpassword',
      checkSubscription:'/api/guidein/v1/job_seeker/checkActiveSubscription/',
      fetchJobs:'/api/guidein/v1/job_seeker/postedjobs/',
      saveJob:'/api/guidein/v1/job_seeker/saveJob',
      savedJobs:'/api/guidein/v1/job_seeker/savedJobs/',
      removeSavedJobs:'/api/guidein/v1/job_seeker/deleteJob',
      appliedReferralStatus:'/api/guidein/v1/job_seeker/getAppliedReferralStatus/',
      saveProfile:'/api/guidein/v1/job_seeker/saveProfile',
      updateProfile:'/api/guidein/v1/job_seeker/updateProfile',
      getProfile:'/api/guidein/v1/job_seeker/getProfile/',
      getDashBoardDetails:'/api/guidein/v1/job_seeker/getDashboardDetails/',
      razorPay:'https://checkout.razorpay.com/v1/checkout.js',
      submitSubscription:'/api/guidein/v1/job_seeker/submitSubscription',
      subscribe:'/api/guidein/v1/job_seeker/subscribe',
      requestReferral:'/api/guidein/v1/job_seeker/requestReferral',
      getAppliedReferral:'/api/guidein/v1/job_seeker/getAppliedReferral/',
      getJob:'/api/guidein/v1/job_seeker/getjob/',
      learner: `/api/guidein/v1/auth/savelearnerdetails`
    },
    jobPoster:{
      register:'/api/guidein/v1/auth/register',
      verification:'/api/guidein/v1/auth/register/otpvalidate',
      resendOtp:'/api/guidein/v1/auth/register/sendotp',
      login: '/api/guidein/v1/auth/authenticate',
      forgotPassword:'/api/guidein/v1/auth/register/sendotp',
      resetPassword:'/api/guidein/v1/auth/register/forgetpassword',
      getRequestedReferrals:'/api/guidein/v1/job_poster/getRequestedReferrals/',
      getDashBoardDetails:'/api/guidein/v1/job_poster/getDashboardDetails/',
      getProfile:'/api/guidein/v1/job_poster/getProfile/',
      postedJobs:'/api/guidein/v1/job_poster/postedjobs/',
      updateJob:'/api/guidein/v1/job_poster/updatejob',
      saveJob:'/api/guidein/v1/job_poster/savejob',
      disableJob:'/api/guidein/v1/job_poster/disablejob/',
      enableJob:'/api/guidein/v1/job_poster/enablejob/',
      getReferredStatus:'/api/guidein/v1/job_poster/getReferredStatus/',
      getAllReferredStatus:'/api/guidein/v1/job_poster/getAllReferredStatus/',
      updateProfile:'/api/guidein/v1/job_poster/updateProfile',
      saveProfile:'/api/guidein/v1/job_poster/saveProfile',
      getReferralRequest:'/api/guidein/v1/job_poster/getReferralRequest/',
      rejectReferral:'/api/guidein/v1/job_poster/rejectReferral',
      submitReferral:'/api/guidein/v1/job_poster/submitReferral',
      getWalletDetails:'/api/guidein/v1/job_poster/getWalletDetails/',
      updateUpiId:'/api/guidein/v1/job_poster/saveAndUpdateUpiId',
      requestWithdraw:'/api/guidein/v1/job_poster/requestWithdraw/'




    },
    admin:{
      registeredUsers:'/api/guidein/v1/admin/jobSeekerRegisteredUsers',
      subscribedUsers:'/api/guidein/v1/admin/jobSeekerSubscribedUsers',
      registeredEmployees:'/api/guidein/v1/admin/jobPosterRegisteredUsers',
      postedJobs:'/api/guidein/v1/admin/getPostedJobs',
      disableJob:'/api/guidein/v1/admin/disablejob/',
      adminDashboard:'/api/guidein/v1/admin/getDashboardDetails',
      referrals:'/api/guidein/v1/admin/getReferrals',
      referralDetails:'/api/guidein/v1/admin/getReferralDetails/',
      approveReferral:'/api/guidein/v1/admin/approveReferral/',
      rejectReferral:'/api/guidein/v1/admin/rejectReferral',
      allWalletDetails:'/api/guidein/v1/admin/getAllWallets',
      empWalletDetails:'/api/guidein/v1/admin/getWalletDetails/',
      disabledJobs:'/api/guidein/v1/admin/getDisabledJobs',
      enableJob:'/api/guidein/v1/admin/enablejob/',
      submitDeposit:'/api/guidein/v1/admin/submitDeposit',
      adminReject:'/api/guidein/v1/admin/rejectReferralRequest',
      getJobseekerProfile:'/api/guidein/v1/admin/getJobSeekerProfile/',
      getJobPosterProfile:'/api/guidein/v1/admin/getJobPosterProfile/',
      getAllLearners : '/api/guidein/v1/admin/getAllLearners'
    }

  },
};

export default config;
