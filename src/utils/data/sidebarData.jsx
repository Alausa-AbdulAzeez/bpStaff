import { RxDashboard } from "react-icons/rx";
import { React } from "react";
import {
  MdCancel,
  MdCategory,
  MdOutlineInventory,
  MdPendingActions,
  MdSchedule,
} from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { RiTeamFill } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { BsClipboardCheck } from "react-icons/bs";
import { FaFileInvoiceDollar } from "react-icons/fa";

// export const receptionistData = [
//   {
//     ulTitle: "MAIN",
//     listItems: [
//       {
//         title: "Dashboard",
//         link: "/",
//         icon: <RxDashboard className="sidebarIcon" />,
//       },
//     ],
//   },
//   {
//     ulTitle: "LIST",
// listItems: [
//   {
//     title: "Candidate Search",
//     link: "/candidateSearch",
//     icon: <AiOutlineSearch className="sidebarIcon" />,
//   },
//   {
//     title: "Schedule Candidate",
//     link: "/scheduleCandidate",
//     icon: <MdSchedule className="sidebarIcon" />,
//   },

//   {
//     title: "Pending Candidates",
//     link: "/pendingCandidates",
//     icon: <MdPendingActions className="sidebarIcon" />,
//   },
//   {
//     title: "View Clients",
//     link: "/viewClients",
//     icon: <RiTeamFill className="sidebarIcon" />,
//   },
// ],
//   },
// ];
// export const phlebotomistData = [
//   {
//     ulTitle: "MAIN",
//     listItems: [
//       {
//         title: "Dashboard",
//         link: "/",
//         icon: <RxDashboard className="sidebarIcon" />,
//       },
//     ],
//   },
//   {
//     ulTitle: "LIST",
//     listItems: [
//       {
//         title: "Candidate Search",
//         link: "/candidateSearch",
//         icon: <AiOutlineSearch className="sidebarIcon" />,
//       },
//       {
//         title: "Pending Candidates",
//         link: "/pendingCandidates",
//         icon: <MdPendingActions className="sidebarIcon" />,
//       },
//       {
//         title: "View Clients",
//         link: "/viewClients",
//         icon: <RiTeamFill className="sidebarIcon" />,
//       },
//     ],
//   },
// ];
// export const labScientistData = [
//   {
//     ulTitle: "MAIN",
//     listItems: [
//       {
//         title: "Dashboard",
//         link: "/",
//         icon: <RxDashboard className="sidebarIcon" />,
//       },
//     ],
//   },
//   {
//     ulTitle: "LIST",
//     listItems: [
//       {
//         title: "Candidate Search",
//         link: "/candidateSearch",
//         icon: <AiOutlineSearch className="sidebarIcon" />,
//       },
//       {
//         title: "Pending Candidates",
//         link: "/pendingCandidates",
//         icon: <MdPendingActions className="sidebarIcon" />,
//       },
//       {
//         title: "Rejected Results",
//         link: "/rejectedResults",
//         icon: <MdCancel className="sidebarIcon" />,
//       },
//       {
//         title: "View Clients",
//         link: "/viewClients",
//         icon: <RiTeamFill className="sidebarIcon" />,
//       },
//       {
//         title: "Reports",
//         link: "/reports",
//         icon: <TbReportAnalytics className="sidebarIcon" />,
//       },
//     ],
//   },
// ];
// export const qualityAssuranceData = [
//   {
//     ulTitle: "MAIN",
//     listItems: [
//       {
//         title: "Dashboard",
//         link: "/",
//         icon: <RxDashboard className="sidebarIcon" />,
//       },
//     ],
//   },
//   {
//     ulTitle: "LIST",
//     listItems: [
//       {
//         title: "Candidate Search",
//         link: "/candidateSearch",
//         icon: <AiOutlineSearch className="sidebarIcon" />,
//       },
//       {
//         title: "Pending Candidates",
//         link: "/pendingCandidates",
//         icon: <MdPendingActions className="sidebarIcon" />,
//       },

//       {
//         title: "View Clients",
//         link: "/viewClients",
//         icon: <RiTeamFill className="sidebarIcon" />,
//       },
//       {
//         title: "Reports",
//         link: "/reports",
//         icon: <TbReportAnalytics className="sidebarIcon" />,
//       },
//     ],
//   },
// ];
// export const reportOfficerData = [
//   {
//     ulTitle: "MAIN",
//     listItems: [
//       {
//         title: "Dashboard",
//         link: "/",
//         icon: <RxDashboard className="sidebarIcon" />,
//       },
//     ],
//   },
//   {
//     ulTitle: "LIST",
//     listItems: [
//       {
//         title: "Candidate Search",
//         link: "/candidateSearch",
//         icon: <AiOutlineSearch className="sidebarIcon" />,
//       },
//       {
//         title: "Pending Candidates",
//         link: "/pendingCandidates",
//         icon: <MdPendingActions className="sidebarIcon" />,
//       },
//       {
//         title: "View Clients",
//         link: "/viewClients",
//         icon: <RiTeamFill className="sidebarIcon" />,
//       },
//       {
//         title: "Reports",
//         link: "/reports",
//         icon: <TbReportAnalytics className="sidebarIcon" />,
//       },
//     ],
//   },
// ];

export const generalData = [
  {
    ulTitle: "MAIN",
    listItems: [
      {
        title: "Dashboard",
        link: "/",
        icon: <RxDashboard className="sidebarIcon" />,
      },
    ],
  },
];
export const generalList = [
  {
    title: "Candidate Search",
    link: "/candidateSearch",
    icon: <AiOutlineSearch className="sidebarIcon" />,
  },

  {
    title: "Pending Candidates",
    link: "/pendingCandidates",
    icon: <MdPendingActions className="sidebarIcon" />,
  },
  {
    title: "View Clients",
    link: "/viewClients",
    icon: <RiTeamFill className="sidebarIcon" />,
  },
];

export const roleSpecificData = {
  Reception: [
    {
      title: "Schedule Candidate",
      link: "/scheduleCandidate",
      icon: <MdSchedule className="sidebarIcon" />,
    },
  ],
  Phlebotomy: [],
  MainLab1: [
    {
      title: "Rejected Results",
      link: "/rejectedResults",
      icon: <MdCancel className="sidebarIcon" />,
    },

    {
      title: "Reports",
      link: "/reports",
      icon: <TbReportAnalytics className="sidebarIcon" />,
    },
  ],
  "Quality assurance": [
    {
      title: "Reports",
      link: "/reports",
      icon: <TbReportAnalytics className="sidebarIcon" />,
    },
  ],
  Report: [
    {
      title: "Reports",
      link: "/reports",
      icon: <TbReportAnalytics className="sidebarIcon" />,
    },
  ],
};

export const receptionistData = [
  {
    title: "Schedule Candidate",
    link: "/scheduleCandidate",
    icon: <MdSchedule className="sidebarIcon" />,
  },
];
export const phlebotomistData = [];
export const labScientistData = [
  {
    title: "Rejected Results",
    link: "/rejectedResults",
    icon: <MdCancel className="sidebarIcon" />,
  },

  {
    title: "Reports",
    link: "/reports",
    icon: <TbReportAnalytics className="sidebarIcon" />,
  },
];
export const qualityAssuranceData = [
  {
    title: "Reports",
    link: "/reports",
    icon: <TbReportAnalytics className="sidebarIcon" />,
  },
];
export const reportOfficerData = [
  {
    title: "Reports",
    link: "/reports",
    icon: <TbReportAnalytics className="sidebarIcon" />,
  },
];
export const partnerLabManagerData = [
  {
    title: "Schedule Candidate",
    link: "/scheduleCandidate",
    icon: <MdSchedule className="sidebarIcon" />,
  },
  {
    title: "Partner Labs",
    link: "/partnerLabs",
    icon: <BsClipboardCheck className="sidebarIcon" />,
  },
  {
    title: "Invoices",
    link: "/invoices",
    icon: <FaFileInvoiceDollar className="sidebarIcon" />,
  },
];
export const customerCareData = [
  {
    title: "Schedule Candidate",
    link: "/scheduleCandidate",
    icon: <MdSchedule className="sidebarIcon" />,
  },
  {
    title: "Manage Stock",
    link: "/scheduleCandidate",
    icon: <MdOutlineInventory className="sidebarIcon" />,
  },
  {
    title: "Pending Candidates",
    link: "/pendingCandidates",
    icon: <MdPendingActions className="sidebarIcon" />,
  },
  {
    title: "Manage Clients",
    link: "/manageClients",
    icon: <RiTeamFill className="sidebarIcon" />,
  },
  {
    title: "Test Categories",
    link: "/testCategories",
    icon: <MdCategory className="sidebarIcon" />,
  },
];
