// "use strict";
 
// // ─── State ──────────────────────────────────────────────────
// let currentUser   = null;
// let currentState  = 'all';
// let currentStream = null;
// let shortlistIds  = new Set();
// let userLat       = null;
// let userLng       = null;
// let showingNearby = false;
// let geoRequested  = false;
// let fbRating      = 0;
// let fbRecommend   = null;
// let _scrollTypeFilter = 'all';
// let _suggestionIndex  = -1;
 
// // ─── Streams ─────────────────────────────────────────────────
// const STREAMS = [
//   { id:'engineering',  name:'Engineering & Technology', icon:'⚙️',  desc:'BTech, MTech, Architecture', keywords:['BTech','MTech','BEng','Engineering','Architecture'] },
//   { id:'medical',      name:'Medical & Health Sciences',icon:'🏥',  desc:'MBBS, BDS, MD, Pharmacy',   keywords:['MBBS','BDS','MD','MS','DM','MCh','BPharma','BAMS','BSc Nursing','Nursing'] },
//   { id:'law',          name:'Law & Legal Studies',      icon:'⚖️',  desc:'LLB, LLM, Integrated Law',  keywords:['LLB','LLM','Law'] },
//   { id:'management',   name:'Management & Business',    icon:'💼',  desc:'MBA, BBA, BCom, PGDM',      keywords:['MBA','BBA','BCom','PGDM','Executive MBA','Commerce','Management'] },
//   { id:'arts',         name:'Arts & Humanities',        icon:'📚',  desc:'BA, MA, Social Sciences',    keywords:['BA','MA','MSW','Humanities','Social','Sanskrit','Arabic','Persian','Buddhist','Historical'] },
//   { id:'science',      name:'Science & Research',       icon:'🔬',  desc:'BSc, MSc, PhD programs',     keywords:['BSc','MSc','PhD','Science','Ecology','MSc Sociology'] },
//   { id:'agriculture',  name:'Agriculture & Veterinary', icon:'🌾',  desc:'BSc Agriculture, Food Tech', keywords:['Agriculture','Agri','Food Tech','BTech Food','Veterinary'] },
//   { id:'computer',     name:'Computer Science & IT',    icon:'💻',  desc:'BCA, MCA, IT programs',      keywords:['BCA','MCA','Computer','MCA'] },
//   { id:'design',       name:'Design & Media',           icon:'🎨',  desc:'Design, Media, Fine Arts',    keywords:['Design','Media','Architecture','Fine Arts'] },
//   { id:'education',    name:'Education & Teaching',     icon:'🏫',  desc:'BEd, MEd, Teacher Training', keywords:['BEd','MEd','Education','Teaching'] }
// ];
 
// // ─── City Coordinates ────────────────────────────────────────
// const CITY_COORDS = {
//   'Chandigarh':[30.7333,76.7794],'Amritsar':[31.6340,74.8723],'Patiala':[30.3398,76.3869],
//   'Phagwara':[31.2241,75.7728],'Mohali':[30.7046,76.7179],'Rupnagar':[30.9654,76.5215],
//   'Jalandhar':[31.3260,75.5762],'Rajpura':[30.4838,76.5900],'Ludhiana':[30.9010,75.8573],
//   'Faridkot':[30.6765,74.7598],'Bathinda':[30.2110,74.9455],'Fatehgarh Sahib':[30.6490,76.3904],
//   'Sirmour':[30.5614,77.2089],'Kurukshetra':[29.9695,76.8783],'Rohtak':[28.8955,76.6066],
//   'Hisar':[29.1492,75.7217],'Sonipat':[28.9931,77.0151],'Faridabad':[28.4089,77.3178],
//   'Sirsa':[29.5348,74.9775],'Gurugram':[28.4595,77.0266],'Ambala':[30.3782,76.7767],
//   'Mahendergarh':[28.2743,76.1500],'Murthal':[28.9977,76.9969],'Meerpur':[28.6500,76.6000],
//   'Panipat':[29.3909,76.9635],'Prayagraj':[25.4358,81.8463],'Varanasi':[25.3176,82.9739],
//   'Aligarh':[27.8974,78.0880],'Lucknow':[26.8467,80.9462],'Kanpur':[26.4499,80.3319],
//   'Noida':[28.5355,77.3910],'Greater Noida':[28.4744,77.5040],'Meerut':[28.9845,77.7064],
//   'Jhansi':[25.4484,78.5685],'Gorakhpur':[26.7606,83.3732],'Ayodhya':[26.7922,82.1998],
//   'Jaunpur':[25.7463,82.6838],'Bareilly':[28.3670,79.4304],'Patna':[25.5941,85.1376],
//   'Bodh Gaya':[24.6961,84.9913],'Gaya':[24.7914,85.0002],'Rajgir':[25.0269,85.4191],
//   'Darbhanga':[26.1542,85.8918],'Muzaffarpur':[26.1197,85.3910],'Sabour':[25.2285,87.0520],
//   'Ara':[25.5562,84.6618],'Chapra':[25.7815,84.7478],'Bhagalpur':[25.2425,86.9842],
//   'Munger':[25.3752,86.4735],'Purnia':[25.7771,87.4753],'Madhepura':[25.9208,86.7926]
// };
 
// // ─── College Data ─────────────────────────────────────────────
// // const COLLEGES = [
// //   {id:1,state:'Punjab',name:'Panjab University',city:'Chandigarh',type:'Government',estd:1947,rating:4.6,courses:['BA','BSc','BCom','MA','MSc','LLB','MBA','PhD'],fees:'₹12,000 – ₹45,000 / yr',intake:5000,accreditation:'NAAC A++'},
// //   {id:2,state:'Punjab',name:'Guru Nanak Dev University',city:'Amritsar',type:'Government',estd:1969,rating:4.4,courses:['BA','BSc','BCom','MBA','MCA','BEd','PhD'],fees:'₹10,000 – ₹40,000 / yr',intake:4500,accreditation:'NAAC A+'},
// //   {id:3,state:'Punjab',name:'Thapar Institute of Engineering & Technology',city:'Patiala',type:'Deemed',estd:1956,rating:4.7,courses:['BTech','MTech','MBA','MCA','PhD'],fees:'₹2,50,000 – ₹3,50,000 / yr',intake:2200,accreditation:'NAAC A'},
// //   {id:4,state:'Punjab',name:'Lovely Professional University',city:'Phagwara',type:'Private',estd:2005,rating:4.3,courses:['BTech','BBA','BCom','MBBS','MBA','LLB','Design'],fees:'₹80,000 – ₹2,00,000 / yr',intake:30000,accreditation:'NAAC A+'},
// //   {id:5,state:'Punjab',name:'Chandigarh University',city:'Mohali',type:'Private',estd:2012,rating:4.4,courses:['BTech','MBA','MCA','BPharma','LLB','Design'],fees:'₹1,20,000 – ₹2,20,000 / yr',intake:25000,accreditation:'NAAC A+'},
// //   {id:6,state:'Punjab',name:'IIT Ropar',city:'Rupnagar',type:'Central',estd:2008,rating:4.8,courses:['BTech','MTech','MSc','PhD'],fees:'₹2,00,000 – ₹2,50,000 / yr',intake:800,accreditation:'NAAC A',isIIT:true},
// //   {id:7,state:'Punjab',name:'NIT Jalandhar',city:'Jalandhar',type:'Central',estd:1987,rating:4.6,courses:['BTech','MTech','MCA','MBA','PhD'],fees:'₹1,50,000 – ₹2,00,000 / yr',intake:1800,accreditation:'NAAC A',isNIT:true},
// //   {id:8,state:'Punjab',name:'Punjabi University',city:'Patiala',type:'Government',estd:1962,rating:4.2,courses:['BA','BSc','BCom','MA','LLB','BEd','MBA'],fees:'₹8,000 – ₹35,000 / yr',intake:3500,accreditation:'NAAC A'},
// //   {id:9,state:'Punjab',name:'Chitkara University',city:'Rajpura',type:'Private',estd:2010,rating:4.3,courses:['BTech','MBA','MCA','BPharma','Architecture'],fees:'₹1,00,000 – ₹2,50,000 / yr',intake:6000,accreditation:'NAAC A'},
// //   {id:10,state:'Punjab',name:'DAV University',city:'Jalandhar',type:'Private',estd:2012,rating:3.9,courses:['BTech','BBA','BCom','MA','MBA','BEd'],fees:'₹60,000 – ₹1,50,000 / yr',intake:3000,accreditation:'NAAC B+'},
// //   {id:11,state:'Punjab',name:'Central University of Punjab',city:'Bathinda',type:'Central',estd:2009,rating:4.3,courses:['MA','MSc','MBA','LLM','PhD','BTech'],fees:'₹15,000 – ₹50,000 / yr',intake:2000,accreditation:'NAAC A'},
// //   {id:12,state:'Punjab',name:'Amity University Punjab',city:'Mohali',type:'Private',estd:2015,rating:4.1,courses:['BTech','BBA','BCom','MBA','LLB','BCA'],fees:'₹1,50,000 – ₹2,80,000 / yr',intake:4000,accreditation:'NAAC A+'},
// //   {id:13,state:'Punjab',name:'GNA University',city:'Phagwara',type:'Private',estd:2014,rating:3.8,courses:['BTech','BBA','MBA','BCA','BPharma'],fees:'₹70,000 – ₹1,60,000 / yr',intake:2500,accreditation:'NAAC B+'},
// //   {id:14,state:'Punjab',name:'Punjab Agricultural University',city:'Ludhiana',type:'Government',estd:1962,rating:4.5,courses:['BSc Agriculture','BTech','MSc','PhD'],fees:'₹20,000 – ₹60,000 / yr',intake:1500,accreditation:'NAAC A'},
// //   {id:15,state:'Punjab',name:'Baba Farid University of Health Sciences',city:'Faridkot',type:'Government',estd:1998,rating:4.2,courses:['MBBS','BDS','BAMS','BPharma','BSc Nursing','MD'],fees:'₹80,000 – ₹5,00,000 / yr',intake:1200,accreditation:'NAAC B+'},
// //   {id:16,state:'Punjab',name:'Rayat Bahra University',city:'Mohali',type:'Private',estd:2011,rating:3.8,courses:['BTech','BPharma','BBA','MBA','LLB'],fees:'₹60,000 – ₹1,50,000 / yr',intake:3000,accreditation:'NAAC B+'},
// //   {id:17,state:'Punjab',name:'Sri Guru Ram Dass University of Health Sciences',city:'Amritsar',type:'Government',estd:2012,rating:4.0,courses:['MBBS','BDS','MD','MS','BSc Nursing'],fees:'₹1,00,000 – ₹6,00,000 / yr',intake:800,accreditation:'NAAC B+'},
// //   {id:18,state:'Punjab',name:'Adesh University',city:'Bathinda',type:'Private',estd:2012,rating:3.9,courses:['MBBS','BPharma','BTech','MBA','BSc Nursing'],fees:'₹90,000 – ₹5,50,000 / yr',intake:1500,accreditation:'NAAC B'},
// //   {id:19,state:'Punjab',name:'Eternal University',city:'Sirmour',type:'Private',estd:2009,rating:3.7,courses:['BTech','BBA','MBA','MSc','PhD'],fees:'₹60,000 – ₹1,50,000 / yr',intake:2000,accreditation:'NAAC B'},
// //   {id:20,state:'Punjab',name:'UIET Panjab University',city:'Chandigarh',type:'Government',estd:1999,rating:4.5,courses:['BTech','MTech','MCA'],fees:'₹75,000 – ₹1,10,000 / yr',intake:900,accreditation:'NAAC A++'},
// //   {id:21,state:'Punjab',name:'Sri Guru Granth Sahib World University',city:'Fatehgarh Sahib',type:'Government',estd:2008,rating:4.0,courses:['BA','BCom','BCA','MBA','MSc','MCA'],fees:'₹18,000 – ₹50,000 / yr',intake:1800,icon:'✨',accreditation:'NAAC B+'},
// //   {id:22,state:'Punjab',name:'IK Gujral Punjab Technical University',city:'Jalandhar',type:'Government',estd:1997,rating:4.2,courses:['BTech','MBA','MCA','BPharma','LLB'],fees:'₹50,000 – ₹1,50,000 / yr',intake:10000,icon:'🔩',accreditation:'NAAC B+'},
// //   {id:23,state:'Punjab',name:'RIMT University',city:'Fatehgarh Sahib',type:'Private',estd:2015,rating:3.7,courses:['BTech','BBA','MBA','BCA','BPharma'],fees:'₹65,000 – ₹1,40,000 / yr',intake:2500,accreditation:'NAAC B'},
// //   {id:24,state:'Punjab',name:'Khalsa College',city:'Amritsar',type:'Government-Aided',estd:1892,rating:4.3,courses:['BA','BSc','BCom','BCA','MA'],fees:'₹8,000 – ₹25,000 / yr',intake:2000,accreditation:'NAAC A'},
// //   {id:25,state:'Punjab',name:'CT University',city:'Ludhiana',type:'Private',estd:2015,rating:3.8,courses:['BTech','BBA','MBA','LLB','BPharma'],fees:'₹70,000 – ₹1,60,000 / yr',intake:3000,accreditation:'NAAC B+'},
// //   {id:26,state:'Haryana',name:'Kurukshetra University',city:'Kurukshetra',type:'Government',estd:1956,rating:4.4,courses:['BA','BSc','BCom','MA','MBA','LLB','PhD'],fees:'₹10,000 – ₹35,000 / yr',intake:5000,accreditation:'NAAC A+'},
// //   {id:27,state:'Haryana',name:'Maharishi Dayanand University',city:'Rohtak',type:'Government',estd:1976,rating:4.2,courses:['BA','BCom','BSc','BEd','MBA','LLB','PhD'],fees:'₹12,000 – ₹40,000 / yr',intake:4500,accreditation:'NAAC A'},
// //   {id:28,state:'Haryana',name:'Guru Jambheshwar University of Science & Tech',city:'Hisar',type:'Government',estd:1995,rating:4.1,courses:['BTech','MBA','MCA','MSc','PhD'],fees:'₹15,000 – ₹45,000 / yr',intake:2500,accreditation:'NAAC A'},
// //   {id:29,state:'Haryana',name:'NIT Kurukshetra',city:'Kurukshetra',type:'Central',estd:1963,rating:4.7,courses:['BTech','MTech','MCA','MBA','PhD'],fees:'₹1,50,000 – ₹2,00,000 / yr',intake:1900,accreditation:'NAAC A+',isNIT:true},
// //   {id:30,state:'Haryana',name:'Ashoka University',city:'Sonipat',type:'Private',estd:2014,rating:4.7,courses:['BA (Hons)','BSc','MA','PhD','MBA'],fees:'₹6,00,000 – ₹8,00,000 / yr',intake:800,accreditation:'NAAC A'},
// //   {id:31,state:'Haryana',name:'O.P. Jindal Global University',city:'Sonipat',type:'Private',estd:2009,rating:4.6,courses:['LLB','BBA','BA','MBA','MA','LLM'],fees:'₹4,00,000 – ₹7,00,000 / yr',intake:2000,accreditation:'NAAC A+'},
// //   {id:32,state:'Haryana',name:'Manav Rachna University',city:'Faridabad',type:'Private',estd:2014,rating:4.0,courses:['BTech','BBA','MBA','BCA','BPharma'],fees:'₹1,00,000 – ₹2,20,000 / yr',intake:4000,accreditation:'NAAC A'},
// //   {id:33,state:'Haryana',name:'MM University Mullana',city:'Ambala',type:'Private',estd:2010,rating:4.0,courses:['BTech','MBA','BPharma','MBBS','BDS'],fees:'₹90,000 – ₹2,50,000 / yr',intake:5000,accreditation:'NAAC A'},
// //   {id:34,state:'Haryana',name:'YMCA University of Science & Technology',city:'Faridabad',type:'Government',estd:2009,rating:4.2,courses:['BTech','MTech','MBA','MCA'],fees:'₹40,000 – ₹80,000 / yr',intake:1500,accreditation:'NAAC A'},
// //   {id:35,state:'Haryana',name:'Chaudhary Devi Lal University',city:'Sirsa',type:'Government',estd:2003,rating:4.0,courses:['BA','BCom','BSc','BEd','MA','MBA'],fees:'₹10,000 – ₹35,000 / yr',intake:2500,accreditation:'NAAC B+'},
// //   {id:36,state:'Haryana',name:'GD Goenka University',city:'Gurugram',type:'Private',estd:2013,rating:4.1,courses:['BTech','BBA','MBA','LLB','Design','Media'],fees:'₹1,50,000 – ₹3,00,000 / yr',intake:3500,accreditation:'NAAC B+'},
// //   {id:37,state:'Haryana',name:'The NorthCap University',city:'Gurugram',type:'Private',estd:2009,rating:4.0,courses:['BTech','MBA','BCA','MCA','LLB'],fees:'₹1,20,000 – ₹2,60,000 / yr',intake:2000,accreditation:'NAAC A'},
// //   {id:38,state:'Haryana',name:'Lingayas Vidyapeeth',city:'Faridabad',type:'Private',estd:2009,rating:3.9,courses:['BTech','BBA','MBA','BCA','BPharma'],fees:'₹80,000 – ₹1,80,000 / yr',intake:3500,accreditation:'NAAC B+'},
// //   {id:39,state:'Haryana',name:'Amity University Haryana',city:'Gurugram',type:'Private',estd:2010,rating:4.1,courses:['BTech','BBA','BCom','MBA','LLB','Design'],fees:'₹1,50,000 – ₹2,80,000 / yr',intake:4000,accreditation:'NAAC A+'},
// //   {id:40,state:'Haryana',name:'SRM University Haryana',city:'Sonipat',type:'Private',estd:2013,rating:4.0,courses:['BTech','BBA','MBA','MCA','BPharma'],fees:'₹1,20,000 – ₹2,40,000 / yr',intake:3000,accreditation:'NAAC A'},
// //   {id:41,state:'Haryana',name:'Starex University',city:'Gurugram',type:'Private',estd:2016,rating:3.7,courses:['BTech','BBA','LLB','MBA','BCA'],fees:'₹70,000 – ₹1,50,000 / yr',intake:2000,accreditation:'NAAC B'},
// //   {id:42,state:'Haryana',name:'Bhagat Phool Singh Mahila Vishwavidyalaya',city:'Sonipat',type:'Government',estd:2006,rating:4.0,courses:['BA','BSc','BCom','BEd','MA','MBA'],fees:'₹8,000 – ₹30,000 / yr',intake:2000,accreditation:'NAAC A'},
// //   {id:43,state:'Haryana',name:'Central University of Haryana',city:'Mahendergarh',type:'Central',estd:2009,rating:4.3,courses:['MA','MSc','MBA','LLM','PhD'],fees:'₹15,000 – ₹50,000 / yr',intake:1500,accreditation:'NAAC A'},
// //   {id:44,state:'Haryana',name:'Deenbandhu Chhotu Ram University',city:'Murthal',type:'Government',estd:2006,rating:4.1,courses:['BTech','MBA','MCA','MTech'],fees:'₹30,000 – ₹80,000 / yr',intake:2000,accreditation:'NAAC B+'},
// //   {id:45,state:'Haryana',name:'CCS Haryana Agricultural University',city:'Hisar',type:'Government',estd:1970,rating:4.4,courses:['BSc Agriculture','BTech','MSc','PhD'],fees:'₹20,000 – ₹55,000 / yr',intake:1500,accreditation:'NAAC A'},
// //   {id:46,state:'Haryana',name:'NIFTEM Sonipat',city:'Sonipat',type:'Central',estd:2012,rating:4.3,courses:['BTech Food Tech','MTech','MBA','PhD'],fees:'₹1,00,000 – ₹1,80,000 / yr',intake:600,accreditation:'NAAC A'},
// //   {id:47,state:'Haryana',name:'Indira Gandhi University',city:'Meerpur',type:'Government',estd:2013,rating:3.9,courses:['BA','BCom','BSc','BEd','MA'],fees:'₹8,000 – ₹28,000 / yr',intake:2000,accreditation:'NAAC B+'},
// //   {id:48,state:'Haryana',name:'MRIIRS University',city:'Faridabad',type:'Private',estd:2014,rating:3.9,courses:['BTech','MBA','BCA','BBA','LLB'],fees:'₹80,000 – ₹1,80,000 / yr',intake:3000,accreditation:'NAAC B+'},
// //   {id:49,state:'Haryana',name:'SGT University',city:'Gurugram',type:'Private',estd:2013,rating:4.0,courses:['MBBS','BDS','BPharma','BTech','MBA'],fees:'₹1,00,000 – ₹6,00,000 / yr',intake:3500,accreditation:'NAAC B+'},
// //   {id:50,state:'Haryana',name:'Panipat Institute of Engineering and Technology',city:'Panipat',type:'Private',estd:2005,rating:3.8,courses:['BTech','MBA','MCA','BCA'],fees:'₹60,000 – ₹1,30,000 / yr',intake:2500,accreditation:'NAAC B'},
// //   {id:51,state:'Uttar Pradesh',name:'University of Allahabad',city:'Prayagraj',type:'Central',estd:1887,rating:4.6,courses:['BA','BSc','BCom','MA','LLB','MBA','PhD'],fees:'₹8,000 – ₹35,000 / yr',intake:6000,accreditation:'NAAC A+'},
// //   {id:52,state:'Uttar Pradesh',name:'Banaras Hindu University',city:'Varanasi',type:'Central',estd:1916,rating:4.8,courses:['BA','BSc','BCom','MBBS','LLB','BTech','PhD'],fees:'₹5,000 – ₹30,000 / yr',intake:15000,accreditation:'NAAC A++'},
// //   {id:53,state:'Uttar Pradesh',name:'Aligarh Muslim University',city:'Aligarh',type:'Central',estd:1875,rating:4.7,courses:['BA','BSc','MBBS','BTech','LLB','MBA','PhD'],fees:'₹6,000 – ₹30,000 / yr',intake:12000,accreditation:'NAAC A+'},
// //   {id:54,state:'Uttar Pradesh',name:'University of Lucknow',city:'Lucknow',type:'Government',estd:1921,rating:4.5,courses:['BA','BSc','BCom','MA','LLB','MBA','PhD'],fees:'₹8,000 – ₹30,000 / yr',intake:8000,accreditation:'NAAC A+'},
// //   {id:55,state:'Uttar Pradesh',name:'IIT Kanpur',city:'Kanpur',type:'Central',estd:1959,rating:4.9,courses:['BTech','MTech','MSc','MBA','PhD'],fees:'₹2,00,000 – ₹2,50,000 / yr',intake:1500,icon:'🔬',accreditation:'NAAC A++',isIIT:true},
// //   {id:56,state:'Uttar Pradesh',name:'IIT (BHU) Varanasi',city:'Varanasi',type:'Central',estd:1968,rating:4.8,courses:['BTech','MTech','MSc','Integrated Dual','PhD'],fees:'₹1,80,000 – ₹2,30,000 / yr',intake:1700,accreditation:'NAAC A+',isIIT:true},
// //   {id:57,state:'Uttar Pradesh',name:'MNNIT Allahabad',city:'Prayagraj',type:'Central',estd:1961,rating:4.7,courses:['BTech','MTech','MCA','MBA','PhD'],fees:'₹1,50,000 – ₹2,00,000 / yr',intake:1600,accreditation:'NAAC A',isNIT:true},
// //   {id:58,state:'Uttar Pradesh',name:'Amity University Noida',city:'Noida',type:'Private',estd:2003,rating:4.4,courses:['BTech','BBA','LLB','MBBS','MBA','Design'],fees:'₹2,00,000 – ₹4,00,000 / yr',intake:20000,accreditation:'NAAC A+'},
// //   {id:59,state:'Uttar Pradesh',name:'Sharda University',city:'Greater Noida',type:'Private',estd:2009,rating:4.2,courses:['BTech','MBA','MBBS','BCA','LLB','BBA'],fees:'₹1,20,000 – ₹3,00,000 / yr',intake:10000,accreditation:'NAAC A'},
// //   {id:60,state:'Uttar Pradesh',name:'Galgotias University',city:'Greater Noida',type:'Private',estd:2011,rating:4.1,courses:['BTech','MBA','MCA','BCA','BBA'],fees:'₹1,00,000 – ₹2,50,000 / yr',intake:12000,accreditation:'NAAC A'},
// //   {id:61,state:'Uttar Pradesh',name:'HBTU Kanpur',city:'Kanpur',type:'Government',estd:1966,rating:4.4,courses:['BTech','MTech','MBA','MCA','PhD'],fees:'₹50,000 – ₹1,20,000 / yr',intake:2500,accreditation:'NAAC A'},
// //   {id:62,state:'Uttar Pradesh',name:'Dr. APJ Abdul Kalam Technical University',city:'Lucknow',type:'Government',estd:2000,rating:4.0,courses:['BTech','MBA','MCA','BPharma'],fees:'₹40,000 – ₹1,00,000 / yr',intake:50000,accreditation:'NAAC A'},
// //   {id:63,state:'Uttar Pradesh',name:'Chaudhary Charan Singh University',city:'Meerut',type:'Government',estd:1965,rating:4.1,courses:['BA','BSc','BCom','BEd','MA','MBA'],fees:'₹8,000 – ₹30,000 / yr',intake:4000,accreditation:'NAAC A'},
// //   {id:64,state:'Uttar Pradesh',name:'Bundelkhand University',city:'Jhansi',type:'Government',estd:1975,rating:4.0,courses:['BA','BSc','BCom','BTech','MA','MBA'],fees:'₹10,000 – ₹35,000 / yr',intake:3500,accreditation:'NAAC A'},
// //   {id:65,state:'Uttar Pradesh',name:'Deen Dayal Upadhyaya Gorakhpur University',city:'Gorakhpur',type:'Government',estd:1957,rating:4.0,courses:['BA','BSc','BCom','MA','LLB','PhD'],fees:'₹8,000 – ₹28,000 / yr',intake:4000,accreditation:'NAAC A'},
// //   {id:66,state:'Uttar Pradesh',name:'King George Medical University',city:'Lucknow',type:'Government',estd:1905,rating:4.7,courses:['MBBS','MD','MS','DM','BDS'],fees:'₹50,000 – ₹1,50,000 / yr',intake:1000,accreditation:'NAAC A+'},
// //   {id:67,state:'Uttar Pradesh',name:'Gautam Buddha University',city:'Greater Noida',type:'Government',estd:2002,rating:4.2,courses:['BTech','MBA','LLB','BCA','MA'],fees:'₹60,000 – ₹1,80,000 / yr',intake:3000,accreditation:'NAAC A'},
// //   {id:68,state:'Uttar Pradesh',name:'Babu Banarasi Das University',city:'Lucknow',type:'Private',estd:2010,rating:4.0,courses:['BTech','MBA','BPharma','MBBS','LLB'],fees:'₹90,000 – ₹2,50,000 / yr',intake:5000,accreditation:'NAAC B+'},
// //   {id:69,state:'Uttar Pradesh',name:'Dr. Ram Manohar Lohia Avadh University',city:'Ayodhya',type:'Government',estd:1975,rating:3.9,courses:['BA','BCom','BSc','BEd','MA','MBA'],fees:'₹8,000 – ₹28,000 / yr',intake:4000,accreditation:'NAAC B+'},
// //   {id:70,state:'Uttar Pradesh',name:'Veer Bahadur Singh Purvanchal University',city:'Jaunpur',type:'Government',estd:1987,rating:3.9,courses:['BA','BSc','BCom','BEd','MA'],fees:'₹7,000 – ₹25,000 / yr',intake:3500,accreditation:'NAAC B+'},
// //   {id:71,state:'Uttar Pradesh',name:'Integral University',city:'Lucknow',type:'Private',estd:2004,rating:4.1,courses:['BTech','BBA','BPharma','MBA','MBBS'],fees:'₹80,000 – ₹2,50,000 / yr',intake:5000,accreditation:'NAAC A'},
// //   {id:72,state:'Uttar Pradesh',name:'Mahatma Jyotiba Phule Rohilkhand University',city:'Bareilly',type:'Government',estd:1975,rating:4.0,courses:['BA','BSc','BCom','BTech','MA','MBA'],fees:'₹8,000 – ₹30,000 / yr',intake:3500,accreditation:'NAAC A'},
// //   {id:73,state:'Uttar Pradesh',name:'Noida International University',city:'Noida',type:'Private',estd:2010,rating:3.8,courses:['BTech','BBA','MBA','BCA','LLB'],fees:'₹80,000 – ₹1,80,000 / yr',intake:4000,accreditation:'NAAC B+'},
// //   {id:74,state:'Uttar Pradesh',name:'Chhatra Shahu Ji Maharaj University',city:'Kanpur',type:'Government',estd:1966,rating:4.0,courses:['BA','BCom','BSc','BEd','MA','LLB'],fees:'₹7,000 – ₹25,000 / yr',intake:4500,accreditation:'NAAC A'},
// //   {id:75,state:'Uttar Pradesh',name:'Sanjay Gandhi Postgraduate Institute',city:'Lucknow',type:'Central',estd:1983,rating:4.8,courses:['MD','DM','MCh','PhD'],fees:'₹30,000 – ₹80,000 / yr',intake:400,accreditation:'NAAC A++'},
// //   {id:76,state:'Bihar',name:'Patna University',city:'Patna',type:'Government',estd:1917,rating:4.3,courses:['BA','BSc','BCom','MA','LLB','MBA','PhD'],fees:'₹5,000 – ₹25,000 / yr',intake:6000,accreditation:'NAAC A'},
// //   {id:77,state:'Bihar',name:'Magadh University',city:'Bodh Gaya',type:'Government',estd:1962,rating:4.0,courses:['BA','BSc','BCom','MA','LLB','BEd'],fees:'₹5,000 – ₹20,000 / yr',intake:5000,accreditation:'NAAC B+'},
// //   {id:78,state:'Bihar',name:'NIT Patna',city:'Patna',type:'Central',estd:1886,rating:4.5,courses:['BTech','MTech','MCA','MBA','PhD'],fees:'₹1,40,000 – ₹1,90,000 / yr',intake:1200,accreditation:'NAAC A',isNIT:true},
// //   {id:79,state:'Bihar',name:'IIT Patna',city:'Patna',type:'Central',estd:2008,rating:4.7,courses:['BTech','MTech','MSc','PhD'],fees:'₹2,00,000 – ₹2,50,000 / yr',intake:900,accreditation:'NAAC A',isIIT:true},
// //   {id:80,state:'Bihar',name:'AIIMS Patna',city:'Patna',type:'Central',estd:2012,rating:4.8,courses:['MBBS','MD','MS','PhD','BSc Nursing'],fees:'₹10,000 – ₹30,000 / yr',intake:800,accreditation:'NAAC A+'},
// //   {id:81,state:'Bihar',name:'Central University of South Bihar',city:'Gaya',type:'Central',estd:2009,rating:4.3,courses:['MA','MSc','MBA','LLM','PhD'],fees:'₹15,000 – ₹50,000 / yr',intake:1500,accreditation:'NAAC A'},
// //   {id:82,state:'Bihar',name:'Nalanda University',city:'Rajgir',type:'Central',estd:2010,rating:4.5,courses:['MA Buddhist Studies','MA Ecology','MA Historical Studies','PhD'],fees:'₹40,000 – ₹90,000 / yr',intake:400,accreditation:'NAAC A'},
// //   {id:83,state:'Bihar',name:'Lalit Narayan Mithila University',city:'Darbhanga',type:'Government',estd:1972,rating:4.0,courses:['BA','BSc','BCom','MA','LLB','BEd'],fees:'₹5,000 – ₹20,000 / yr',intake:5000,accreditation:'NAAC B+'},
// //   {id:84,state:'Bihar',name:'BR Ambedkar Bihar University',city:'Muzaffarpur',type:'Government',estd:1960,rating:3.9,courses:['BA','BCom','BSc','BEd','MA','LLB'],fees:'₹4,000 – ₹18,000 / yr',intake:5500,accreditation:'NAAC B+'},
// //   {id:85,state:'Bihar',name:'Aryabhatta Knowledge University',city:'Patna',type:'Government',estd:2008,rating:4.1,courses:['BTech','BPharma','MBBS','MBA','MCA'],fees:'₹30,000 – ₹90,000 / yr',intake:5000,accreditation:'NAAC B+'},
// //   {id:86,state:'Bihar',name:'Bihar Agricultural University',city:'Sabour',type:'Government',estd:2010,rating:4.2,courses:['BSc Agriculture','MSc','PhD','BTech Agri Engg'],fees:'₹20,000 – ₹60,000 / yr',intake:1000,accreditation:'NAAC B+'},
// //   {id:87,state:'Bihar',name:'Patliputra University',city:'Patna',type:'Government',estd:2018,rating:3.9,courses:['BA','BSc','BCom','BCA','MA'],fees:'₹5,000 – ₹18,000 / yr',intake:4000,accreditation:'NAAC B'},
// //   {id:88,state:'Bihar',name:'Veer Kunwar Singh University',city:'Ara',type:'Government',estd:1992,rating:3.9,courses:['BA','BSc','BCom','BEd','MA'],fees:'₹4,000 – ₹18,000 / yr',intake:4000,accreditation:'NAAC B'},
// //   {id:89,state:'Bihar',name:'Jai Prakash University',city:'Chapra',type:'Government',estd:1990,rating:3.8,courses:['BA','BSc','BCom','BEd','MA','LLB'],fees:'₹4,000 – ₹16,000 / yr',intake:3500,accreditation:'NAAC B'},
// //   {id:90,state:'Bihar',name:'Tilka Manjhi Bhagalpur University',city:'Bhagalpur',type:'Government',estd:1960,rating:4.0,courses:['BA','BSc','BCom','MA','LLB','BEd'],fees:'₹5,000 – ₹20,000 / yr',intake:5000,accreditation:'NAAC B+'},
// //   {id:91,state:'Bihar',name:'Munger University',city:'Munger',type:'Government',estd:2018,rating:3.8,courses:['BA','BSc','BCom','BCA','MA'],fees:'₹4,000 – ₹16,000 / yr',intake:3000,accreditation:'NAAC B'},
// //   {id:92,state:'Bihar',name:'Purnea University',city:'Purnia',type:'Government',estd:2018,rating:3.7,courses:['BA','BSc','BCom','MA'],fees:'₹4,000 – ₹15,000 / yr',intake:3000,accreditation:'NAAC B'},
// //   {id:93,state:'Bihar',name:'Bhupendra Narayan Mandal University',city:'Madhepura',type:'Government',estd:1992,rating:3.8,courses:['BA','BSc','BCom','BEd','MA','LLB'],fees:'₹4,000 – ₹18,000 / yr',intake:3500,accreditation:'NAAC B'},
// //   {id:94,state:'Bihar',name:'Kameshwar Singh Darbhanga Sanskrit University',city:'Darbhanga',type:'Government',estd:1961,rating:4.0,courses:['Sanskrit BA','Shastri','Acharya','MA Sanskrit','PhD'],fees:'₹3,000 – ₹12,000 / yr',intake:2000,accreditation:'NAAC B+'},
// //   {id:95,state:'Bihar',name:'Chandragupt Institute of Management',city:'Patna',type:'Government',estd:2008,rating:4.4,courses:['MBA','PGDM','Executive MBA'],fees:'₹2,00,000 – ₹4,00,000 / yr',intake:500,accreditation:'NAAC A'},
// //   {id:96,state:'Bihar',name:'IGIMS Patna',city:'Patna',type:'Government',estd:1983,rating:4.4,courses:['MBBS','MD','MS','BSc Nursing','PhD'],fees:'₹30,000 – ₹1,00,000 / yr',intake:600,accreditation:'NAAC A'},
// //   {id:97,state:'Bihar',name:'AN Sinha Institute of Social Studies',city:'Patna',type:'Government',estd:1951,rating:4.2,courses:['MA Sociology','MA Economics','MSW','PhD'],fees:'₹5,000 – ₹20,000 / yr',intake:600,accreditation:'NAAC A'},
// //   {id:98,state:'Bihar',name:'Maulana Mazharul Haque Arabic Persian University',city:'Patna',type:'Government',estd:1998,rating:3.9,courses:['BA Arabic','MA Arabic','MA Persian','PhD'],fees:'₹3,000 – ₹12,000 / yr',intake:800,accreditation:'NAAC B+'},
// //   {id:99,state:'Bihar',name:'Babasaheb Bhimrao Ambedkar Bihar University',city:'Muzaffarpur',type:'Government',estd:1952,rating:3.9,courses:['BA','BSc','BCom','BEd','MA','LLB'],fees:'₹4,000 – ₹18,000 / yr',intake:5000,accreditation:'NAAC B+'},
// //   {id:100,state:'Bihar',name:'Darbhanga Medical College & Hospital',city:'Darbhanga',type:'Government',estd:1946,rating:4.2,courses:['MBBS','MD','MS','BSc Nursing'],fees:'₹40,000 – ₹1,00,000 / yr',intake:800,accreditation:'NAAC B+'}
// // ];
// const COLLEGES=[
//   {id:1,state:'Punjab',name:'Panjab University',city:'Chandigarh',type:'Government',estd:1947,rating:4.6,courses:['BA','BSc','BCom','MA','MSc','LLB','MBA','PhD','BBA','BCA','BPharma'],fees:'₹12,000 – ₹45,000 / yr',intake:5000,accreditation:'NAAC A++'},
//   {id:2,state:'Punjab',name:'Guru Nanak Dev University',city:'Amritsar',type:'Government',estd:1969,rating:4.4,courses:['BA','BSc','BCom','MBA','MCA','BEd','PhD'],fees:'₹10,000 – ₹40,000 / yr',intake:4500,accreditation:'NAAC A+'},
//   {id:3,state:'Punjab',name:'Thapar Institute of Engineering & Technology',city:'Patiala',type:'Deemed',estd:1956,rating:4.7,courses:['BTech','MTech','MBA','MCA','PhD'],fees:'₹2,50,000 – ₹3,50,000 / yr',intake:2200,accreditation:'NAAC A'},
//   {id:4,state:'Punjab',name:'Lovely Professional University',city:'Phagwara',type:'Private',estd:2005,rating:4.3,courses:['BTech','BBA','BCom','MBBS','MBA','LLB','Design'],fees:'₹80,000 – ₹2,00,000 / yr',intake:30000,accreditation:'NAAC A+'},
//   {id:5,state:'Punjab',name:'Chandigarh University',city:'Mohali',type:'Private',estd:2012,rating:4.4,courses:['BTech','MBA','MCA','BPharma','LLB','Design'],fees:'₹1,20,000 – ₹2,20,000 / yr',intake:25000,accreditation:'NAAC A+'},
//   {id:6,state:'Punjab',name:'IIT Ropar',city:'Rupnagar',type:'Central',estd:2008,rating:4.8,courses:['BTech','MTech','MSc','PhD'],fees:'₹2,00,000 – ₹2,50,000 / yr',intake:800,accreditation:'NAAC A',isIIT:true},
//   {id:7,state:'Punjab',name:'NIT Jalandhar',city:'Jalandhar',type:'Central',estd:1987,rating:4.6,courses:['BTech','MTech','MCA','MBA','PhD'],fees:'₹1,50,000 – ₹2,00,000 / yr',intake:1800,accreditation:'NAAC A',isNIT:true},
//   {id:8,state:'Punjab',name:'Punjabi University',city:'Patiala',type:'Government',estd:1962,rating:4.2,courses:['BA','BSc','BCom','MA','LLB','BEd','MBA'],fees:'₹8,000 – ₹35,000 / yr',intake:3500,accreditation:'NAAC A'},
//   {id:9,state:'Punjab',name:'Chitkara University',city:'Rajpura',type:'Private',estd:2010,rating:4.3,courses:['BTech','MBA','MCA','BPharma','Architecture'],fees:'₹1,00,000 – ₹2,50,000 / yr',intake:6000,accreditation:'NAAC A'},
//   {id:10,state:'Punjab',name:'DAV University',city:'Jalandhar',type:'Private',estd:2012,rating:3.9,courses:['BTech','BBA','BCom','MA','MBA','BEd'],fees:'₹60,000 – ₹1,50,000 / yr',intake:3000,accreditation:'NAAC B+'},
//   {id:11,state:'Punjab',name:'Central University of Punjab',city:'Bathinda',type:'Central',estd:2009,rating:4.3,courses:['MA','MSc','MBA','LLM','PhD','BTech','MTech','LLB','BSc','BA','BPharma'],page:'centraluniversityofpunjab.html',fees:'₹15,000 – ₹50,000 / yr',intake:2000,accreditation:'NAAC A'},
//   {id:12,state:'Punjab',name:'Amity University Punjab',city:'Mohali',type:'Private',estd:2015,rating:4.1,courses:['BTech','BBA','BCom','MBA','LLB','BCA'],fees:'₹1,50,000 – ₹2,80,000 / yr',intake:4000,accreditation:'NAAC A+'},
//   {id:13,state:'Punjab',name:'GNA University',city:'Phagwara',type:'Private',estd:2014,rating:3.8,courses:['BTech','BBA','MBA','BCA','BPharma'],fees:'₹70,000 – ₹1,60,000 / yr',intake:2500,accreditation:'NAAC B+'},
//   {id:14,state:'Punjab',name:'Punjab Agricultural University',city:'Ludhiana',type:'Government',estd:1962,rating:4.5,courses:['BSc Agriculture','BTech','MSc','PhD'],fees:'₹20,000 – ₹60,000 / yr',intake:1500,accreditation:'NAAC A'},
//   {id:15,state:'Punjab',name:'Baba Farid University of Health Sciences',city:'Faridkot',type:'Government',estd:1998,rating:4.2,courses:['MBBS','BDS','BAMS','BPharma','BSc Nursing','MD'],fees:'₹80,000 – ₹5,00,000 / yr',intake:1200,accreditation:'NAAC B+'},
//   {id:16,state:'Punjab',name:'Rayat Bahra University',city:'Mohali',type:'Private',estd:2011,rating:3.8,courses:['BTech','BPharma','BBA','MBA','LLB'],fees:'₹60,000 – ₹1,50,000 / yr',intake:3000,accreditation:'NAAC B+'},
//   {id:17,state:'Punjab',name:'Sri Guru Ram Dass University of Health Sciences',city:'Amritsar',type:'Government',estd:2012,rating:4.0,courses:['MBBS','BDS','MD','MS','BSc Nursing'],fees:'₹1,00,000 – ₹6,00,000 / yr',intake:800,accreditation:'NAAC B+'},
//   {id:18,state:'Punjab',name:'Adesh University',city:'Bathinda',type:'Private',estd:2012,rating:3.9,courses:['MBBS','BPharma','BTech','MBA','BSc Nursing'],fees:'₹90,000 – ₹5,50,000 / yr',intake:1500,accreditation:'NAAC B'},
//   {id:19,state:'Punjab',name:'Eternal University',city:'Sirmour',type:'Private',estd:2009,rating:3.7,courses:['BTech','BBA','MBA','MSc','PhD'],fees:'₹60,000 – ₹1,50,000 / yr',intake:2000,accreditation:'NAAC B'},
//   {id:20,state:'Punjab',name:'UIET Panjab University',city:'Chandigarh',type:'Government',estd:1999,rating:4.5,courses:['BTech','MTech','MCA'],fees:'₹75,000 – ₹1,10,000 / yr',intake:900,accreditation:'NAAC A++'},
//   {id:21,state:'Punjab',name:'Sri Guru Granth Sahib World University',city:'Fatehgarh Sahib',type:'Government',estd:2008,rating:4.0,courses:['BA','BCom','BCA','MBA','MSc','MCA'],fees:'₹18,000 – ₹50,000 / yr',intake:1800,accreditation:'NAAC B+'},
//   {id:22,state:'Punjab',name:'IK Gujral Punjab Technical University',city:'Jalandhar',type:'Government',estd:1997,rating:4.2,courses:['BTech','MBA','MCA','BPharma','LLB'],fees:'₹50,000 – ₹1,50,000 / yr',intake:10000,accreditation:'NAAC B+'},
//   {id:23,state:'Punjab',name:'RIMT University',city:'Fatehgarh Sahib',type:'Private',estd:2015,rating:3.7,courses:['BTech','BBA','MBA','BCA','BPharma'],fees:'₹65,000 – ₹1,40,000 / yr',intake:2500,accreditation:'NAAC B'},
//   {id:24,state:'Punjab',name:'Khalsa College',city:'Amritsar',type:'Government-Aided',estd:1892,rating:4.3,courses:['BA','BSc','BCom','BCA','MA'],fees:'₹8,000 – ₹25,000 / yr',intake:2000,accreditation:'NAAC A'},
//   {id:25,state:'Punjab',name:'CT University',city:'Ludhiana',type:'Private',estd:2015,rating:3.8,courses:['BTech','BBA','MBA','LLB','BPharma'],fees:'₹70,000 – ₹1,60,000 / yr',intake:3000,accreditation:'NAAC B+'},
//   {id:26,state:'Haryana',name:'Kurukshetra University',city:'Kurukshetra',type:'Government',estd:1956,rating:4.4,courses:['BA','BSc','BCom','MA','MBA','LLB','PhD'],fees:'₹10,000 – ₹35,000 / yr',intake:5000,accreditation:'NAAC A+'},
//   {id:27,state:'Haryana',name:'Maharishi Dayanand University',city:'Rohtak',type:'Government',estd:1976,rating:4.2,courses:['BA','BCom','BSc','BEd','MBA','LLB','PhD'],fees:'₹12,000 – ₹40,000 / yr',intake:4500,accreditation:'NAAC A'},
//   {id:28,state:'Haryana',name:'Guru Jambheshwar University of Science & Tech',city:'Hisar',type:'Government',estd:1995,rating:4.1,courses:['BTech','MBA','MCA','MSc','PhD'],fees:'₹15,000 – ₹45,000 / yr',intake:2500,accreditation:'NAAC A'},
//   {id:29,state:'Haryana',name:'NIT Kurukshetra',city:'Kurukshetra',type:'Central',estd:1963,rating:4.7,courses:['BTech','MTech','MCA','MBA','PhD'],fees:'₹1,50,000 – ₹2,00,000 / yr',intake:1900,accreditation:'NAAC A+',isNIT:true},
//   {id:30,state:'Haryana',name:'Ashoka University',city:'Sonipat',type:'Private',estd:2014,rating:4.7,courses:['BA (Hons)','BSc','MA','PhD','MBA'],fees:'₹6,00,000 – ₹8,00,000 / yr',intake:800,accreditation:'NAAC A'},
//   {id:31,state:'Haryana',name:'O.P. Jindal Global University',city:'Sonipat',type:'Private',estd:2009,rating:4.6,courses:['LLB','BBA','BA','MBA','MA','LLM'],fees:'₹4,00,000 – ₹7,00,000 / yr',intake:2000,accreditation:'NAAC A+'},
//   {id:32,state:'Haryana',name:'Manav Rachna University',city:'Faridabad',type:'Private',estd:2014,rating:4.0,courses:['BTech','BBA','MBA','BCA','BPharma'],fees:'₹1,00,000 – ₹2,20,000 / yr',intake:4000,accreditation:'NAAC A'},
//   {id:33,state:'Haryana',name:'MM University Mullana',city:'Ambala',type:'Private',estd:2010,rating:4.0,courses:['BTech','MBA','BPharma','MBBS','BDS'],fees:'₹90,000 – ₹2,50,000 / yr',intake:5000,accreditation:'NAAC A'},
//   {id:34,state:'Haryana',name:'YMCA University of Science & Technology',city:'Faridabad',type:'Government',estd:2009,rating:4.2,courses:['BTech','MTech','MBA','MCA'],fees:'₹40,000 – ₹80,000 / yr',intake:1500,accreditation:'NAAC A'},
//   {id:35,state:'Haryana',name:'Chaudhary Devi Lal University',city:'Sirsa',type:'Government',estd:2003,rating:4.0,courses:['BA','BCom','BSc','BEd','MA','MBA'],fees:'₹10,000 – ₹35,000 / yr',intake:2500,accreditation:'NAAC B+'},
//   {id:36,state:'Haryana',name:'GD Goenka University',city:'Gurugram',type:'Private',estd:2013,rating:4.1,courses:['BTech','BBA','MBA','LLB','Design','Media'],fees:'₹1,50,000 – ₹3,00,000 / yr',intake:3500,accreditation:'NAAC B+'},
//   {id:37,state:'Haryana',name:'The NorthCap University',city:'Gurugram',type:'Private',estd:2009,rating:4.0,courses:['BTech','MBA','BCA','MCA','LLB'],fees:'₹1,20,000 – ₹2,60,000 / yr',intake:2000,accreditation:'NAAC A'},
//   {id:38,state:'Haryana',name:'Lingayas Vidyapeeth',city:'Faridabad',type:'Private',estd:2009,rating:3.9,courses:['BTech','BBA','MBA','BCA','BPharma'],fees:'₹80,000 – ₹1,80,000 / yr',intake:3500,accreditation:'NAAC B+'},
//   {id:39,state:'Haryana',name:'Amity University Haryana',city:'Gurugram',type:'Private',estd:2010,rating:4.1,courses:['BTech','BBA','BCom','MBA','LLB','Design'],fees:'₹1,50,000 – ₹2,80,000 / yr',intake:4000,accreditation:'NAAC A+'},
//   {id:40,state:'Haryana',name:'SRM University Haryana',city:'Sonipat',type:'Private',estd:2013,rating:4.0,courses:['BTech','BBA','MBA','MCA','BPharma'],fees:'₹1,20,000 – ₹2,40,000 / yr',intake:3000,accreditation:'NAAC A'},
//   {id:41,state:'Haryana',name:'Starex University',city:'Gurugram',type:'Private',estd:2016,rating:3.7,courses:['BTech','BBA','LLB','MBA','BCA'],fees:'₹70,000 – ₹1,50,000 / yr',intake:2000,accreditation:'NAAC B'},
//   {id:42,state:'Haryana',name:'Bhagat Phool Singh Mahila Vishwavidyalaya',city:'Sonipat',type:'Government',estd:2006,rating:4.0,courses:['BA','BSc','BCom','BEd','MA','MBA'],fees:'₹8,000 – ₹30,000 / yr',intake:2000,accreditation:'NAAC A'},
//   {id:43,state:'Haryana',name:'Central University of Haryana',city:'Mahendergarh',type:'Central',estd:2009,rating:4.3,courses:['MA','MSc','MBA','LLM','PhD','BTech','MTech'],page:'centraluniversityofharyana.html',fees:'₹15,000 – ₹50,000 / yr',intake:1500,accreditation:'NAAC A'},
//   {id:44,state:'Haryana',name:'Deenbandhu Chhotu Ram University',city:'Murthal',type:'Government',estd:2006,rating:4.1,courses:['BTech','MBA','MCA','MTech'],fees:'₹30,000 – ₹80,000 / yr',intake:2000,accreditation:'NAAC B+'},
//   {id:45,state:'Haryana',name:'CCS Haryana Agricultural University',city:'Hisar',type:'Government',estd:1970,rating:4.4,courses:['BSc Agriculture','BTech','MSc','PhD'],fees:'₹20,000 – ₹55,000 / yr',intake:1500,accreditation:'NAAC A'},
//   {id:46,state:'Haryana',name:'NIFTEM Sonipat',city:'Sonipat',type:'Central',estd:2012,rating:4.3,courses:['BTech Food Tech','MTech','MBA','PhD'],fees:'₹1,00,000 – ₹1,80,000 / yr',intake:600,accreditation:'NAAC A'},
//   {id:47,state:'Haryana',name:'Indira Gandhi University',city:'Meerpur',type:'Government',estd:2013,rating:3.9,courses:['BA','BCom','BSc','BEd','MA'],fees:'₹8,000 – ₹28,000 / yr',intake:2000,accreditation:'NAAC B+'},
//   {id:48,state:'Haryana',name:'MRIIRS University',city:'Faridabad',type:'Private',estd:2014,rating:3.9,courses:['BTech','MBA','BCA','BBA','LLB'],fees:'₹80,000 – ₹1,80,000 / yr',intake:3000,accreditation:'NAAC B+'},
//   {id:49,state:'Haryana',name:'SGT University',city:'Gurugram',type:'Private',estd:2013,rating:4.0,courses:['MBBS','BDS','BPharma','BTech','MBA'],fees:'₹1,00,000 – ₹6,00,000 / yr',intake:3500,accreditation:'NAAC B+'},
//   {id:50,state:'Haryana',name:'Panipat Institute of Engineering and Technology',city:'Panipat',type:'Private',estd:2005,rating:3.8,courses:['BTech','MBA','MCA','BCA'],fees:'₹60,000 – ₹1,30,000 / yr',intake:2500,accreditation:'NAAC B'},
//   {id:51,state:'Uttar Pradesh',name:'University of Allahabad',city:'Prayagraj',type:'Central',estd:1887,rating:4.6,courses:['BA','BSc','BCom','MA','LLB','MBA','PhD'],fees:'₹8,000 – ₹35,000 / yr',intake:6000,accreditation:'NAAC A+'},
//   {id:52,state:'Uttar Pradesh',name:'Banaras Hindu University',city:'Varanasi',type:'Central',estd:1916,rating:4.8,courses:['BA','BSc','BCom','MBBS','LLB','BTech','PhD'],fees:'₹5,000 – ₹30,000 / yr',intake:15000,accreditation:'NAAC A++'},
//   {id:53,state:'Uttar Pradesh',name:'Aligarh Muslim University',city:'Aligarh',type:'Central',estd:1875,rating:4.7,courses:['BA','BSc','MBBS','BTech','LLB','MBA','PhD'],page:'aligarhmuslimuniversity.html',fees:'₹6,000 – ₹30,000 / yr',intake:12000,accreditation:'NAAC A+'},
//   {id:54,state:'Uttar Pradesh',name:'University of Lucknow',city:'Lucknow',type:'Government',estd:1921,rating:4.5,courses:['BA','BSc','BCom','MA','LLB','MBA','PhD'],fees:'₹8,000 – ₹30,000 / yr',intake:8000,accreditation:'NAAC A+'},
//   {id:55,state:'Uttar Pradesh',name:'IIT Kanpur',city:'Kanpur',type:'Central',estd:1959,rating:4.9,courses:['BTech','MTech','MSc','MBA','PhD'],fees:'₹2,00,000 – ₹2,50,000 / yr',intake:1500,accreditation:'NAAC A++',isIIT:true},
//   {id:56,state:'Uttar Pradesh',name:'IIT (BHU) Varanasi',city:'Varanasi',type:'Central',estd:1968,rating:4.8,courses:['BTech','MTech','MSc','Integrated Dual','PhD'],fees:'₹1,80,000 – ₹2,30,000 / yr',intake:1700,accreditation:'NAAC A+',isIIT:true},
//   {id:57,state:'Uttar Pradesh',name:'MNNIT Allahabad',city:'Prayagraj',type:'Central',estd:1961,rating:4.7,courses:['BTech','MTech','MCA','MBA','PhD'],fees:'₹1,50,000 – ₹2,00,000 / yr',intake:1600,accreditation:'NAAC A',isNIT:true},
//   {id:58,state:'Uttar Pradesh',name:'Amity University Noida',city:'Noida',type:'Private',estd:2003,rating:4.4,courses:['BTech','BBA','LLB','MBBS','MBA','Design'],fees:'₹2,00,000 – ₹4,00,000 / yr',intake:20000,accreditation:'NAAC A+'},
//   {id:59,state:'Uttar Pradesh',name:'Sharda University',city:'Greater Noida',type:'Private',estd:2009,rating:4.2,courses:['BTech','MBA','MBBS','BCA','LLB','BBA'],fees:'₹1,20,000 – ₹3,00,000 / yr',intake:10000,accreditation:'NAAC A'},
//   {id:60,state:'Uttar Pradesh',name:'Galgotias University',city:'Greater Noida',type:'Private',estd:2011,rating:4.1,courses:['BTech','MBA','MCA','BCA','BBA'],fees:'₹1,00,000 – ₹2,50,000 / yr',intake:12000,accreditation:'NAAC A'},
//   {id:61,state:'Uttar Pradesh',name:'HBTU Kanpur',city:'Kanpur',type:'Government',estd:1966,rating:4.4,courses:['BTech','MTech','MBA','MCA','PhD'],fees:'₹50,000 – ₹1,20,000 / yr',intake:2500,accreditation:'NAAC A'},
//   {id:62,state:'Uttar Pradesh',name:'Dr. APJ Abdul Kalam Technical University',city:'Lucknow',type:'Government',estd:2000,rating:4.0,courses:['BTech','MBA','MCA','BPharma'],fees:'₹40,000 – ₹1,00,000 / yr',intake:50000,accreditation:'NAAC A'},
//   {id:63,state:'Uttar Pradesh',name:'Chaudhary Charan Singh University',city:'Meerut',type:'Government',estd:1965,rating:4.1,courses:['BA','BSc','BCom','BEd','MA','MBA'],fees:'₹8,000 – ₹30,000 / yr',intake:4000,accreditation:'NAAC A'},
//   {id:64,state:'Uttar Pradesh',name:'Bundelkhand University',city:'Jhansi',type:'Government',estd:1975,rating:4.0,courses:['BA','BSc','BCom','BTech','MA','MBA'],fees:'₹10,000 – ₹35,000 / yr',intake:3500,accreditation:'NAAC A'},
//   {id:65,state:'Uttar Pradesh',name:'Deen Dayal Upadhyaya Gorakhpur University',city:'Gorakhpur',type:'Government',estd:1957,rating:4.0,courses:['BA','BSc','BCom','MA','LLB','PhD'],fees:'₹8,000 – ₹28,000 / yr',intake:4000,accreditation:'NAAC A'},
//   {id:66,state:'Uttar Pradesh',name:'King George Medical University',city:'Lucknow',type:'Government',estd:1905,rating:4.7,courses:['MBBS','MD','MS','DM','BDS'],fees:'₹50,000 – ₹1,50,000 / yr',intake:1000,accreditation:'NAAC A+'},
//   {id:67,state:'Uttar Pradesh',name:'Gautam Buddha University',city:'Greater Noida',type:'Government',estd:2002,rating:4.2,courses:['BTech','MBA','LLB','BCA','MA'],fees:'₹60,000 – ₹1,80,000 / yr',intake:3000,accreditation:'NAAC A'},
//   {id:68,state:'Uttar Pradesh',name:'Babu Banarasi Das University',city:'Lucknow',type:'Private',estd:2010,rating:4.0,courses:['BTech','MBA','BPharma','MBBS','LLB'],fees:'₹90,000 – ₹2,50,000 / yr',intake:5000,accreditation:'NAAC B+'},
//   {id:69,state:'Uttar Pradesh',name:'Dr. Ram Manohar Lohia Avadh University',city:'Ayodhya',type:'Government',estd:1975,rating:3.9,courses:['BA','BCom','BSc','BEd','MA','MBA'],fees:'₹8,000 – ₹28,000 / yr',intake:4000,accreditation:'NAAC B+'},
//   {id:70,state:'Uttar Pradesh',name:'Veer Bahadur Singh Purvanchal University',city:'Jaunpur',type:'Government',estd:1987,rating:3.9,courses:['BA','BSc','BCom','BEd','MA'],fees:'₹7,000 – ₹25,000 / yr',intake:3500,accreditation:'NAAC B+'},
//   {id:71,state:'Uttar Pradesh',name:'Integral University',city:'Lucknow',type:'Private',estd:2004,rating:4.1,courses:['BTech','BBA','BPharma','MBA','MBBS'],fees:'₹80,000 – ₹2,50,000 / yr',intake:5000,accreditation:'NAAC A'},
//   {id:72,state:'Uttar Pradesh',name:'Mahatma Jyotiba Phule Rohilkhand University',city:'Bareilly',type:'Government',estd:1975,rating:4.0,courses:['BA','BSc','BCom','BTech','MA','MBA'],fees:'₹8,000 – ₹30,000 / yr',intake:3500,accreditation:'NAAC A'},
//   {id:73,state:'Uttar Pradesh',name:'Noida International University',city:'Noida',type:'Private',estd:2010,rating:3.8,courses:['BTech','BBA','MBA','BCA','LLB'],fees:'₹80,000 – ₹1,80,000 / yr',intake:4000,accreditation:'NAAC B+'},
//   {id:74,state:'Uttar Pradesh',name:'Chhatra Shahu Ji Maharaj University',city:'Kanpur',type:'Government',estd:1966,rating:4.0,courses:['BA','BCom','BSc','BEd','MA','LLB'],fees:'₹7,000 – ₹25,000 / yr',intake:4500,accreditation:'NAAC A'},
//   {id:75,state:'Uttar Pradesh',name:'Sanjay Gandhi Postgraduate Institute',city:'Lucknow',type:'Central',estd:1983,rating:4.8,courses:['MD','DM','MCh','PhD'],fees:'₹30,000 – ₹80,000 / yr',intake:400,accreditation:'NAAC A++'},
//   {id:76,state:'Bihar',name:'Patna University',city:'Patna',type:'Government',estd:1917,rating:4.3,courses:['BA','BSc','BCom','MA','LLB','MBA','PhD'],fees:'₹5,000 – ₹25,000 / yr',intake:6000,accreditation:'NAAC A'},
//   {id:77,state:'Bihar',name:'Magadh University',city:'Bodh Gaya',type:'Government',estd:1962,rating:4.0,courses:['BA','BSc','BCom','MA','LLB','BEd'],fees:'₹5,000 – ₹20,000 / yr',intake:5000,accreditation:'NAAC B+'},
//   {id:78,state:'Bihar',name:'NIT Patna',city:'Patna',type:'Central',estd:1886,rating:4.5,courses:['BTech','MTech','MCA','MBA','PhD'],fees:'₹1,40,000 – ₹1,90,000 / yr',intake:1200,accreditation:'NAAC A',isNIT:true},
//   {id:79,state:'Bihar',name:'IIT Patna',city:'Patna',type:'Central',estd:2008,rating:4.7,courses:['BTech','MTech','MSc','PhD'],fees:'₹2,00,000 – ₹2,50,000 / yr',intake:900,accreditation:'NAAC A',isIIT:true},
//   {id:80,state:'Bihar',name:'AIIMS Patna',city:'Patna',type:'Central',estd:2012,rating:4.8,courses:['MBBS','MD','MS','PhD','BSc Nursing'],fees:'₹10,000 – ₹30,000 / yr',intake:800,accreditation:'NAAC A+'},
//   {id:81,state:'Bihar',name:'Central University of South Bihar',city:'Gaya',type:'Central',estd:2009,rating:4.3,courses:['MA','MSc','MBA','LLM','PhD'],fees:'₹15,000 – ₹50,000 / yr',intake:1500,accreditation:'NAAC A'},
//   {id:82,state:'Bihar',name:'Nalanda University',city:'Rajgir',type:'Central',estd:2010,rating:4.5,courses:['MA Buddhist Studies','MA Ecology','MA Historical Studies','PhD'],fees:'₹40,000 – ₹90,000 / yr',intake:400,accreditation:'NAAC A'},
//   {id:83,state:'Bihar',name:'Lalit Narayan Mithila University',city:'Darbhanga',type:'Government',estd:1972,rating:4.0,courses:['BA','BSc','BCom','MA','LLB','BEd'],fees:'₹5,000 – ₹20,000 / yr',intake:5000,accreditation:'NAAC B+'},
//   {id:84,state:'Bihar',name:'BR Ambedkar Bihar University',city:'Muzaffarpur',type:'Government',estd:1960,rating:3.9,courses:['BA','BCom','BSc','BEd','MA','LLB'],fees:'₹4,000 – ₹18,000 / yr',intake:5500,accreditation:'NAAC B+'},
//   {id:85,state:'Bihar',name:'Aryabhatta Knowledge University',city:'Patna',type:'Government',estd:2008,rating:4.1,courses:['BTech','BPharma','MBBS','MBA','MCA'],fees:'₹30,000 – ₹90,000 / yr',intake:5000,accreditation:'NAAC B+'},
//   {id:86,state:'Bihar',name:'Bihar Agricultural University',city:'Sabour',type:'Government',estd:2010,rating:4.2,courses:['BSc Agriculture','MSc','PhD','BTech Agri Engg'],fees:'₹20,000 – ₹60,000 / yr',intake:1000,accreditation:'NAAC B+'},
//   {id:87,state:'Bihar',name:'Patliputra University',city:'Patna',type:'Government',estd:2018,rating:3.9,courses:['BA','BSc','BCom','BCA','MA'],fees:'₹5,000 – ₹18,000 / yr',intake:4000,accreditation:'NAAC B'},
//   {id:88,state:'Bihar',name:'Veer Kunwar Singh University',city:'Ara',type:'Government',estd:1992,rating:3.9,courses:['BA','BSc','BCom','BEd','MA'],fees:'₹4,000 – ₹18,000 / yr',intake:4000,accreditation:'NAAC B'},
//   {id:89,state:'Bihar',name:'Jai Prakash University',city:'Chapra',type:'Government',estd:1990,rating:3.8,courses:['BA','BSc','BCom','BEd','MA','LLB'],fees:'₹4,000 – ₹16,000 / yr',intake:3500,accreditation:'NAAC B'},
//   {id:90,state:'Bihar',name:'Tilka Manjhi Bhagalpur University',city:'Bhagalpur',type:'Government',estd:1960,rating:4.0,courses:['BA','BSc','BCom','MA','LLB','BEd'],fees:'₹5,000 – ₹20,000 / yr',intake:5000,accreditation:'NAAC B+'},
//   {id:91,state:'Bihar',name:'Munger University',city:'Munger',type:'Government',estd:2018,rating:3.8,courses:['BA','BSc','BCom','BCA','MA'],fees:'₹4,000 – ₹16,000 / yr',intake:3000,accreditation:'NAAC B'},
//   {id:92,state:'Bihar',name:'Purnea University',city:'Purnia',type:'Government',estd:2018,rating:3.7,courses:['BA','BSc','BCom','MA'],fees:'₹4,000 – ₹15,000 / yr',intake:3000,accreditation:'NAAC B'},
//   {id:93,state:'Bihar',name:'Bhupendra Narayan Mandal University',city:'Madhepura',type:'Government',estd:1992,rating:3.8,courses:['BA','BSc','BCom','BEd','MA','LLB'],fees:'₹4,000 – ₹18,000 / yr',intake:3500,accreditation:'NAAC B'},
//   {id:94,state:'Bihar',name:'Kameshwar Singh Darbhanga Sanskrit University',city:'Darbhanga',type:'Government',estd:1961,rating:4.0,courses:['Sanskrit BA','Shastri','Acharya','MA Sanskrit','PhD'],fees:'₹3,000 – ₹12,000 / yr',intake:2000,accreditation:'NAAC B+'},
//   {id:95,state:'Bihar',name:'Chandragupt Institute of Management',city:'Patna',type:'Government',estd:2008,rating:4.4,courses:['MBA','PGDM','Executive MBA'],fees:'₹2,00,000 – ₹4,00,000 / yr',intake:500,accreditation:'NAAC A'},
//   {id:96,state:'Bihar',name:'IGIMS Patna',city:'Patna',type:'Government',estd:1983,rating:4.4,courses:['MBBS','MD','MS','BSc Nursing','PhD'],fees:'₹30,000 – ₹1,00,000 / yr',intake:600,accreditation:'NAAC A'},
//   {id:97,state:'Bihar',name:'AN Sinha Institute of Social Studies',city:'Patna',type:'Government',estd:1951,rating:4.2,courses:['MA Sociology','MA Economics','MSW','PhD'],fees:'₹5,000 – ₹20,000 / yr',intake:600,accreditation:'NAAC A'},
//   {id:98,state:'Bihar',name:'Maulana Mazharul Haque Arabic Persian University',city:'Patna',type:'Government',estd:1998,rating:3.9,courses:['BA Arabic','MA Arabic','MA Persian','PhD'],fees:'₹3,000 – ₹12,000 / yr',intake:800,accreditation:'NAAC B+'},
//   {id:99,state:'Bihar',name:'Babasaheb Bhimrao Ambedkar Bihar University',city:'Muzaffarpur',type:'Government',estd:1952,rating:3.9,courses:['BA','BSc','BCom','BEd','MA','LLB'],fees:'₹4,000 – ₹18,000 / yr',intake:5000,accreditation:'NAAC B+'},
//   {id:100,state:'Bihar',name:'Darbhanga Medical College & Hospital',city:'Darbhanga',type:'Government',estd:1946,rating:4.2,courses:['MBBS','MD','MS','BSc Nursing'],fees:'₹40,000 – ₹1,00,000 / yr',intake:800,accreditation:'NAAC B+'},
//   {id:101,state:'Uttar Pradesh',name:'Rani Lakshmi Bai Central Agricultural University',city:'Jhansi',type:'Central',estd:2014,rating:4.5,courses:['B.Sc Agriculture','B.Sc Horticulture','M.Sc','PhD'],page:'ranilaxmibaicentraluniversity.html',fees:'₹30,000 – ₹75,000 / yr',intake:120,accreditation:'ICAR'}
// ];
// COLLEGES.forEach(c => {
//   if (!c.icon) {
//     if (c.isIIT) c.icon = '🔬';
//     else if (c.isNIT) c.icon = '🔩';
//     else if (c.type === 'Central') c.icon = '🏛';
//     else if (c.type === 'Government' || c.type === 'Government-Aided') c.icon = '🏢';
//     else if (c.type === 'Private') c.icon = '🏫';
//     else if (c.type === 'Deemed') c.icon = '📜';
//     else c.icon = '🎓';
//   }
// });
 
// // ─── Stream-College Matching ──────────────────────────────────
// function collegeMatchesStream(college, streamId) {
//   if (!streamId) return true;
//   const stream = STREAMS.find(s => s.id === streamId);
//   if (!stream) return true;
//   return college.courses.some(course =>
//     stream.keywords.some(kw => course.toLowerCase().includes(kw.toLowerCase()))
//   );
// }
 
// function getStreamMatchingCourses(college, streamId) {
//   if (!streamId) return college.courses;
//   const stream = STREAMS.find(s => s.id === streamId);
//   if (!stream) return college.courses;
//   return college.courses.filter(course =>
//     stream.keywords.some(kw => course.toLowerCase().includes(kw.toLowerCase()))
//   );
// }
 
// // ─── Distance ────────────────────────────────────────────────
// function haversine(lat1, lng1, lat2, lng2) {
//   const R = 6371;
//   const dLat = (lat2 - lat1) * Math.PI / 180;
//   const dLng = (lng2 - lng1) * Math.PI / 180;
//   const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLng/2)**2;
//   return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
// }
 
// function getCollegeDistance(college) {
//   if (userLat === null) return null;
//   const coords = CITY_COORDS[college.city];
//   if (!coords) return null;
//   return haversine(userLat, userLng, coords[0], coords[1]);
// }
 
// function getLowestFee(feeStr) {
//   const match = feeStr.match(/[\d,]+/);
//   if (!match) return 0;
//   return parseInt(match[0].replace(/,/g, ''));
// }
 
// // ─── Auto Suggestions ────────────────────────────────────────
// function showAutoSuggestions(val) {
//   const box = document.getElementById('autoSuggestBox');
//   const query = val.trim().toLowerCase();
 
//   if (!query || query.length < 1) {
//     box.style.display = 'none';
//     _suggestionIndex = -1;
//     return;
//   }
 
//   // Gather matches: colleges, cities, courses, states
//   const suggestions = [];
//   const seen = new Set();
 
//   COLLEGES.forEach(c => {
//     // Match college name
//     if (c.name.toLowerCase().includes(query) && !seen.has(c.name)) {
//       suggestions.push({ label: `${c.icon} ${c.name}`, sub: `${c.city} · ${c.state}`, value: c.name, type: 'college' });
//       seen.add(c.name);
//     }
//     // Match city
//     if (c.city.toLowerCase().includes(query) && !seen.has('city:' + c.city)) {
//       suggestions.push({ label: ` ${c.city}`, sub: `City · ${c.state}`, value: c.city, type: 'city' });
//       seen.add('city:' + c.city);
//     }
//     // Match course
//     c.courses.forEach(co => {
//       if (co.toLowerCase().includes(query) && !seen.has('course:' + co)) {
//         suggestions.push({ label: `📖 ${co}`, sub: 'Course', value: co, type: 'course' });
//         seen.add('course:' + co);
//       }
//     });
//     // Match state
//     if (c.state.toLowerCase().includes(query) && !seen.has('state:' + c.state)) {
//       suggestions.push({ label: `🗺️ ${c.state}`, sub: 'State', value: c.state, type: 'state' });
//       seen.add('state:' + c.state);
//     }
//   });
 
//   const top = suggestions.slice(0, 8);
 
//   if (!top.length) {
//     box.style.display = 'none';
//     return;
//   }
 
//   box.innerHTML = top.map((s, i) => `
//     <div class="suggest-item" data-index="${i}" data-value="${s.value}" data-type="${s.type}"
//       onmousedown="pickSuggestion('${s.value.replace(/'/g,"\\'")}', '${s.type}')"
//       onmouseover="highlightSuggestion(${i})"
//       style="padding:10px 16px; cursor:pointer; display:flex; align-items:center; justify-content:space-between;
//              border-bottom:1px solid #f1f5f9; transition:background .15s;">
//       <div>
//         <div style="font-size:.9rem; font-weight:600; color:#1e293b;">${s.label}</div>
//         <div style="font-size:.75rem; color:#94a3b8; margin-top:1px;">${s.sub}</div>
//       </div>
//       <span style="font-size:.7rem; color:#cbd5e1; text-transform:uppercase; letter-spacing:.05em;">${s.type}</span>
//     </div>
//   `).join('');
 
//   box.style.display = 'block';
//   _suggestionIndex = -1;
// }
 
// function highlightSuggestion(idx) {
//   _suggestionIndex = idx;
//   document.querySelectorAll('.suggest-item').forEach((el, i) => {
//     el.style.background = i === idx ? '#f0f9ff' : '';
//   });
// }
 
// function pickSuggestion(value, type) {
//   const scrollInput = document.getElementById('scrollSearchInput');
//   const mainInput   = document.getElementById('searchInput');
 
//   scrollInput.value = value;
//   mainInput.value   = value;
 
//   document.getElementById('autoSuggestBox').style.display = 'none';
//   document.getElementById('clearSearchBtn').style.display = value ? '' : 'none';
 
//   // If state match, also set state filter
//   const stateMatch = ['Punjab','Haryana','Uttar Pradesh','Bihar'].find(
//     s => s.toLowerCase() === value.toLowerCase()
//   );
//   if (type === 'state' && stateMatch) {
//     currentState = stateMatch;
//     document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
//     const stateTab = document.querySelector(`.tab[data-state="${stateMatch}"]`);
//     if (stateTab) stateTab.classList.add('active');
//     document.getElementById('activeStateLabel').textContent = stateMatch;
//   }
 
//   filterColleges();
//   jumpToSection('all-section');
// }
 
// function handleSuggestionKey(e) {
//   const box = document.getElementById('autoSuggestBox');
//   const items = box.querySelectorAll('.suggest-item');
//   if (!items.length || box.style.display === 'none') return;
 
//   if (e.key === 'ArrowDown') {
//     e.preventDefault();
//     _suggestionIndex = Math.min(_suggestionIndex + 1, items.length - 1);
//     items.forEach((el, i) => el.style.background = i === _suggestionIndex ? '#f0f9ff' : '');
//   } else if (e.key === 'ArrowUp') {
//     e.preventDefault();
//     _suggestionIndex = Math.max(_suggestionIndex - 1, 0);
//     items.forEach((el, i) => el.style.background = i === _suggestionIndex ? '#f0f9ff' : '');
//   } else if (e.key === 'Enter') {
//     e.preventDefault();
//     if (_suggestionIndex >= 0 && items[_suggestionIndex]) {
//       const val  = items[_suggestionIndex].dataset.value;
//       const type = items[_suggestionIndex].dataset.type;
//       pickSuggestion(val, type);
//     } else {
//       // Just search with current text
//       const val = document.getElementById('scrollSearchInput').value;
//       document.getElementById('searchInput').value = val;
//       box.style.display = 'none';
//       filterColleges();
//       jumpToSection('all-section');
//     }
//   } else if (e.key === 'Escape') {
//     box.style.display = 'none';
//   }
// }
 
// function toggleClearBtn(val) {
//   document.getElementById('clearSearchBtn').style.display = val ? '' : 'none';
// }
 
// function clearAutoSearch() {
//   document.getElementById('scrollSearchInput').value = '';
//   document.getElementById('searchInput').value = '';
//   document.getElementById('clearSearchBtn').style.display = 'none';
//   document.getElementById('autoSuggestBox').style.display = 'none';
//   filterColleges();
// }
 
// // Close suggestions when clicking outside
// document.addEventListener('click', e => {
//   const box   = document.getElementById('autoSuggestBox');
//   const input = document.getElementById('scrollSearchInput');
//   if (box && input && !box.contains(e.target) && e.target !== input) {
//     box.style.display = 'none';
//   }
// });
 
// // ─── Render Stream Cards ──────────────────────────────────────
// function renderStreamCards() {
//   const grid = document.getElementById('streamGrid');
//   grid.innerHTML = STREAMS.map((s, i) => {
//     const count = COLLEGES.filter(c => collegeMatchesStream(c, s.id)).length;
//     return `
//     <div class="stream-card" data-stream="${s.id}" onclick="selectStream('${s.id}', this)"
//          style="animation-delay:${i * 50}ms">
//       <div class="sc-icon-wrap">
//         <span>${s.icon}</span>
//         <div class="sc-check">✓</div>
//       </div>
//       <div class="sc-name">${s.name}</div>
//       <div class="sc-desc">${s.desc}</div>
//       <div class="sc-count">${count} universities</div>
//     </div>`;
//   }).join('');
// }
 
// function selectStream(id, el) {
//   document.querySelectorAll('.stream-card').forEach(c => c.classList.remove('selected'));
//   el.classList.add('selected');
//   currentStream = id;
//   document.getElementById('continueBtn').disabled = false;
// }
 
// // ─── Geolocation ─────────────────────────────────────────────
// function initGeolocation() {
//   const bar = document.getElementById('nearbyBar');
//   bar.classList.remove('hidden');
//   document.getElementById('nearbyBarText').innerHTML =
//     '<div class="geo-loading"><div class="spinner"></div> Detecting your location…</div>';
//   document.getElementById('nearbyBtn').style.display = 'none';
 
//   if (!navigator.geolocation) {
//     bar.classList.add('hidden');
//     return;
//   }
 
//   navigator.geolocation.getCurrentPosition(
//     pos => {
//       userLat = pos.coords.latitude;
//       userLng = pos.coords.longitude;
//       geoRequested = true;
//       document.getElementById('nearbyBarText').innerHTML =
//         'Location detected! <strong>Show colleges nearest to you.</strong>';
//       document.getElementById('nearbyBtn').style.display = '';
//       document.getElementById('nearbyBtn').textContent = 'Show Nearby Colleges';
//     },
//     () => { bar.classList.add('hidden'); },
//     { timeout: 8000 }
//   );
// }
 
// function toggleNearby() {
//   showingNearby = !showingNearby;
//   const btn  = document.getElementById('nearbyBtn');
//   const pill = document.getElementById('nearbyPill');
//   if (showingNearby) {
//     btn.textContent = 'Clear Nearby Filter';
//     pill.classList.remove('hidden');
//     document.getElementById('sortSelect').value = 'distance';
//   } else {
//     btn.textContent = 'Show Nearby Colleges';
//     pill.classList.add('hidden');
//   }
//   filterColleges();
// }
 
// function closeNearbyBar() {
//   document.getElementById('nearbyBar').classList.add('hidden');
//   if (showingNearby) { showingNearby = false; filterColleges(); }
// }
 
// // ─── Helpers ─────────────────────────────────────────────────
// function getStars(r) {
//   const full  = Math.floor(r);
//   const half  = r % 1 >= 0.5 ? 1 : 0;
//   const empty = 5 - full - half;
//   return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
// }
// function stateTagClass(s) {
//   return { Punjab:'tag-Punjab', Haryana:'tag-Haryana', 'Uttar Pradesh':'tag-UP', Bihar:'tag-Bihar' }[s] || '';
// }
 
// // ─── Section Jump ─────────────────────────────────────────────
// function jumpToSection(sectionId) {
//   const el = document.getElementById(sectionId);
//   if (!el) return;
//   const navbar    = document.querySelector('.navbar');
//   const scrollBar = document.getElementById('scrollFilterBar');
//   const offset = (navbar ? navbar.offsetHeight : 64) +
//     (scrollBar && scrollBar.classList.contains('visible') ? scrollBar.offsetHeight : 0);
//   const top = el.getBoundingClientRect().top + window.pageYOffset - offset - 8;
//   window.scrollTo({ top, behavior: 'smooth' });
// }
 
// // ─── Scroll Filter Bar visibility ────────────────────────────
// window.addEventListener('scroll', () => {
//   const bar  = document.getElementById('scrollFilterBar');
//   const hero = document.querySelector('.hero-banner');
//   if (!bar || !hero) return;
//   if (hero.getBoundingClientRect().bottom < 64) {
//     bar.classList.add('visible');
//   } else {
//     bar.classList.remove('visible');
//   }
// });
 
// // ─── Scroll Filter Bar type buttons ──────────────────────────
// function scrollFilterByType(btn, type) {
//   _scrollTypeFilter = type;
//   document.querySelectorAll('.scroll-tab').forEach(t => t.classList.remove('active'));
//   btn.classList.add('active');
//   // Clear search when switching type tabs
//   document.getElementById('searchInput').value = '';
//   document.getElementById('scrollSearchInput').value = '';
//   document.getElementById('autoSuggestBox').style.display = 'none';
//   filterColleges();
//   jumpToSection('all-section');
// }
 
// // ─── Render IIT / NIT Sections ────────────────────────────────
// function renderIITSection() {
//   const iits = COLLEGES.filter(c => c.isIIT);
//   document.getElementById('iitCount').textContent = iits.length;
//   document.getElementById('iitGrid').innerHTML = iits.map((c, i) => renderInstCard(c, 'iit', i)).join('');
// }
 
// function renderNITSection() {
//   const nits = COLLEGES.filter(c => c.isNIT);
//   document.getElementById('nitCount').textContent = nits.length;
//   document.getElementById('nitGrid').innerHTML = nits.map((c, i) => renderInstCard(c, 'nit', i)).join('');
// }
 
// function renderInstCard(c, kind, i) {
//   const label    = kind === 'iit' ? 'IIT' : 'NIT';
//   const dist     = getCollegeDistance(c);
//   const distText = dist !== null ? ` &nbsp;·&nbsp; ${Math.round(dist)} km` : '';
//   const showCourses = c.courses.slice(0, 5);
//   return `
//   <div class="inst-card ${kind}-card" style="animation-delay:${i * 60}ms">
//     <div class="inst-card-head">
//       <div class="inst-badge">${c.icon} ${label}</div>
//       <h4>${c.name}</h4>
//       <div class="inst-city">${c.city}, ${c.state} · Est. ${c.estd}${distText}</div>
//     </div>
//     <div class="inst-card-body">
//       <div class="inst-meta">
//         <span class="inst-meta-pill">📋 ${c.accreditation}</span>
//         <span class="inst-meta-pill">👥 ${c.intake.toLocaleString()} intake</span>
//         <span class="inst-meta-pill">💰 ${c.fees}</span>
//       </div>
//       <div class="inst-rating">
//         <span class="stars">${getStars(c.rating)}</span>
//         <span>${c.rating}/5</span>
//       </div>
//       <div class="inst-courses">
//         ${showCourses.map(co => `<span class="inst-course-tag">${co}</span>`).join('')}
//         ${c.courses.length > 5 ? `<span class="inst-course-tag">+${c.courses.length - 5} more</span>` : ''}
//       </div>
//     </div>
//     <div class="inst-card-foot">
//       <button class="btn-detail" onclick="showDetail(${c.id})">View Details</button>
//       <button class="btn-shortlist ${shortlistIds.has(c.id) ? 'active' : ''}"
//         id="sl-btn-inst-${c.id}" onclick="toggleShortlistInst(${c.id})">
//         ${shortlistIds.has(c.id) ? '⭐ Saved' : '☆ Save'}
//       </button>
//     </div>
//   </div>`;
// }
 
// function toggleShortlistInst(id) {
//   shortlistIds.has(id) ? shortlistIds.delete(id) : shortlistIds.add(id);
//   document.getElementById('shortlistCount').textContent = shortlistIds.size;
//   ['sl-btn-' + id, 'sl-btn-inst-' + id].forEach(btnId => {
//     const btn = document.getElementById(btnId);
//     if (btn) {
//       btn.classList.toggle('active', shortlistIds.has(id));
//       btn.textContent = shortlistIds.has(id) ? '⭐ Saved' : '☆ Save';
//     }
//   });
// }
 
// // ─── Render Colleges ──────────────────────────────────────────
// function renderColleges(list) {
//   const grid = document.getElementById('collegeGrid');
//   document.getElementById('resultCount').textContent =
//     `Showing ${list.length} universit${list.length === 1 ? 'y' : 'ies'}`;
 
//   const query = document.getElementById('searchInput').value.trim();
//   const hasFilters = currentState !== 'all' || currentStream || showingNearby ||
//     query || _scrollTypeFilter !== 'all';
//   document.getElementById('clearFiltersBtn').style.display = hasFilters ? '' : 'none';
 
//   if (!list.length) {
//     grid.innerHTML = `<div class="no-results"><div class="emoji">🔎</div>
//       <h4>No universities found</h4><p>Try adjusting your search or filters</p></div>`;
//     return;
//   }
 
//   grid.innerHTML = list.map((c, idx) => {
//     const dist         = getCollegeDistance(c);
//     const matchCourses = getStreamMatchingCourses(c, currentStream);
//     const allCourses   = matchCourses.length ? matchCourses : c.courses;
//     const showCourses  = allCourses.slice(0, 4);
//     const extras       = allCourses.length > 4
//       ? `<span class="card-tag">+${allCourses.length - 4} more</span>` : '';
//     const distBadge    = dist !== null
//       ? `<span class="distance-badge">${dist < 1 ? '<1' : Math.round(dist)} km</span>` : '';
 
//     return `
//     <div class="college-card" style="animation-delay:${idx * 25}ms">
//       <div class="card-header">
//         <div class="card-badges">
//           <span class="card-state-tag ${stateTagClass(c.state)}">${c.state}</span>
//           ${distBadge}
//         </div>
//         <span class="card-rank">#${c.id}</span>
//         <h4>${c.icon} ${c.name}</h4>
//         <p class="card-city">${c.city} &nbsp;·&nbsp; Est. ${c.estd}</p>
//       </div>
//       <div class="card-body">
//         <div class="card-meta">
//           <div class="meta-item"><span class="meta-label">Type</span><span class="meta-value">${c.type}</span></div>
//           <div class="meta-item"><span class="meta-label">Intake</span><span class="meta-value">${c.intake.toLocaleString()}</span></div>
//           <div class="meta-item"><span class="meta-label">Fees</span><span class="meta-value" style="font-size:.78rem">${c.fees}</span></div>
//           <div class="meta-item"><span class="meta-label">Accreditation</span><span class="meta-value">${c.accreditation}</span></div>
//         </div>
//         <div class="card-rating">
//           <span class="stars">${getStars(c.rating)}</span>
//           <span class="rating-num">${c.rating} / 5</span>
//         </div>
//         <div class="card-tags">
//           ${showCourses.map(co => {
//             const isMatch = currentStream && getStreamMatchingCourses(c, currentStream).includes(co);
//             return `<span class="card-tag" style="${isMatch ? 'background:#fff8e0;color:#92400e;font-weight:600;border:1px solid #fde68a' : ''}">${co}</span>`;
//           }).join('')}
//           ${extras}
//         </div>
//       </div>
//       <div class="card-footer">
//         <button class="btn-detail" onclick="showDetail(${c.id})">View Details</button>
//         <button class="btn-shortlist ${shortlistIds.has(c.id) ? 'active' : ''}"
//           id="sl-btn-${c.id}" onclick="toggleShortlist(${c.id})">
//           ${shortlistIds.has(c.id) ? '⭐ Saved' : '☆ Save'}
//         </button>
//       </div>
//     </div>`;
//   }).join('');
// }
 
// // ─── Filter & Sort ────────────────────────────────────────────
// function filterColleges() {
//   // Always read from scrollSearchInput as the primary input and sync to hidden searchInput
//   const scrollVal = document.getElementById('scrollSearchInput').value;
//   document.getElementById('searchInput').value = scrollVal;
 
//   const query = scrollVal.toLowerCase().trim();
//   const sort  = document.getElementById('sortSelect').value;
 
//   let list = COLLEGES.filter(c => {
//     const matchState  = currentState === 'all' || c.state === currentState;
//     const matchStream = !currentStream || collegeMatchesStream(c, currentStream);
 
//     let matchType = true;
//     if (_scrollTypeFilter === 'iit') matchType = !!c.isIIT;
//     else if (_scrollTypeFilter === 'nit') matchType = !!c.isNIT;
//     else if (_scrollTypeFilter === 'central') matchType = c.type === 'Central';
//     else if (_scrollTypeFilter === 'government') matchType = c.type === 'Government' || c.type === 'Government-Aided';
//     else if (_scrollTypeFilter === 'private') matchType = c.type === 'Private';
//     else if (_scrollTypeFilter === 'deemed') matchType = c.type === 'Deemed';
 
//     const matchQuery = !query ||
//       c.name.toLowerCase().includes(query) ||
//       c.city.toLowerCase().includes(query) ||
//       c.type.toLowerCase().includes(query) ||
//       c.state.toLowerCase().includes(query) ||
//       c.accreditation.toLowerCase().includes(query) ||
//       c.courses.some(co => co.toLowerCase().includes(query));
 
//     const matchNearby = !showingNearby ||
//       (getCollegeDistance(c) !== null && getCollegeDistance(c) <= 200);
 
//     return matchState && matchStream && matchQuery && matchNearby && matchType;
//   });
 
//   if (sort === 'az')       list.sort((a, b) => a.name.localeCompare(b.name));
//   else if (sort === 'za')  list.sort((a, b) => b.name.localeCompare(a.name));
//   else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
//   else if (sort === 'distance' && userLat !== null) {
//     list.sort((a, b) => (getCollegeDistance(a) ?? 9999) - (getCollegeDistance(b) ?? 9999));
//   } else if (sort === 'fees_low') {
//     list.sort((a, b) => getLowestFee(a.fees) - getLowestFee(b.fees));
//   }
 
//   renderColleges(list);
// }
 
// function filterByState(btn, state) {
//   currentState = state;
//   document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
//   btn.classList.add('active');
//   document.getElementById('activeStateLabel').textContent = state === 'all' ? 'All States' : state;
//   // Don't clear search when filtering by state — just re-filter
//   filterColleges();
// }
 
// function clearAllFilters() {
//   currentState      = 'all';
//   currentStream     = null;
//   showingNearby     = false;
//   _scrollTypeFilter = 'all';
//   document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
//   document.querySelector('.tab[data-state="all"]').classList.add('active');
//   document.querySelectorAll('.scroll-tab').forEach(t => t.classList.remove('active'));
//   document.querySelector('.scroll-tab[data-type="all"]').classList.add('active');
//   document.getElementById('activeStateLabel').textContent = 'All States';
//   document.getElementById('searchInput').value       = '';
//   document.getElementById('scrollSearchInput').value = '';
//   document.getElementById('autoSuggestBox').style.display = 'none';
//   document.getElementById('clearSearchBtn').style.display = 'none';
//   document.getElementById('sortSelect').value = 'default';
//   document.getElementById('nearbyPill').classList.add('hidden');
//   if (geoRequested) document.getElementById('nearbyBtn').textContent = 'Show Nearby Colleges';
//   document.getElementById('heroStreamPill').style.display = 'none';
//   document.getElementById('navStreamBadge').style.display = 'none';
//   document.getElementById('heroBannerDesc').textContent =
//     'Browse 100 universities across 4 states — filter, compare, and shortlist your top choices';
//   filterColleges();
// }
 
// // ─── Shortlist ────────────────────────────────────────────────
// function toggleShortlist(id) {
//   shortlistIds.has(id) ? shortlistIds.delete(id) : shortlistIds.add(id);
//   document.getElementById('shortlistCount').textContent = shortlistIds.size;
//   ['sl-btn-' + id, 'sl-btn-inst-' + id].forEach(btnId => {
//     const btn = document.getElementById(btnId);
//     if (btn) {
//       btn.classList.toggle('active', shortlistIds.has(id));
//       btn.textContent = shortlistIds.has(id) ? '⭐ Saved' : '☆ Save';
//     }
//   });
// }
 
// function showShortlist() {
//   const modal = document.getElementById('shortlistModal');
//   const body  = document.getElementById('shortlistBody');
//   modal.classList.remove('hidden');
//   if (!shortlistIds.size) {
//     body.innerHTML = "<p class='empty-msg'>You haven't shortlisted any universities yet.</p>";
//     return;
//   }
//   body.innerHTML = [...shortlistIds].map(id => {
//     const c = COLLEGES.find(x => x.id === id);
//     return `<div class="shortlist-item">
//       <div><div class="si-name">${c.icon} ${c.name}</div><div class="si-state">${c.city} · ${c.state}</div></div>
//       <button onclick="toggleShortlist(${c.id});showShortlist()">🗑</button>
//     </div>`;
//   }).join('');
// }
// function closeShortlist() { document.getElementById('shortlistModal').classList.add('hidden'); }
// function clearShortlist() { shortlistIds.clear(); document.getElementById('shortlistCount').textContent = 0; filterColleges(); closeShortlist(); }
// function applyAll() { alert(`✅ Application submitted for ${shortlistIds.size} university/universities!\nOur counsellor will contact you within 24 hours.`); }
 
// // ─── Detail Modal ─────────────────────────────────────────────




// function showDetail(id) {
//   const c    = COLLEGES.find(x => x.id === id);
//   if (c.page) {
//     window.location.href = c.page;
//     return;
//   }




//   const dist = getCollegeDistance(c);
//   const streamMatching = getStreamMatchingCourses(c, currentStream);
//   document.getElementById('detailTitle').textContent = `${c.icon} ${c.name}`;
//   document.getElementById('detailBody').innerHTML = `
//     <div class="detail-header-info">
//       <div class="detail-badge" style="background:var(--gray-100)">${c.icon}</div>
//       <div class="detail-info">
//         <h3>${c.name}</h3>
//         <p>${c.city}, ${c.state} &nbsp;·&nbsp; Est. ${c.estd}
//           ${dist !== null ? `&nbsp;·&nbsp; ${Math.round(dist)} km from you` : ''}</p>
//       </div>
//     </div>
//     <div class="detail-grid">
//       <div class="detail-row"><div class="dr-label">University Type</div><div class="dr-value">${c.type}</div></div>
//       <div class="detail-row"><div class="dr-label">Rating</div><div class="dr-value">${getStars(c.rating)} (${c.rating}/5)</div></div>
//       <div class="detail-row"><div class="dr-label">Annual Fees</div><div class="dr-value">${c.fees}</div></div>
//       <div class="detail-row"><div class="dr-label">Total Intake</div><div class="dr-value">${c.intake.toLocaleString()} students</div></div>
//       <div class="detail-row"><div class="dr-label">Accreditation</div><div class="dr-value">${c.accreditation}</div></div>
//       <div class="detail-row"><div class="dr-label">State</div><div class="dr-value">${c.state}</div></div>
//     </div>
//     ${currentStream && streamMatching.length ? `
//     <div class="detail-courses" style="margin-bottom:16px">
//       <h4>✅ Matching Your Stream (${STREAMS.find(s => s.id === currentStream)?.name})</h4>
//       <div class="course-chips">${streamMatching.map(co => `<span class="course-chip highlight-chip">${co}</span>`).join('')}</div>
//     </div>` : ''}
//     <div class="detail-courses">
//       <h4>All Available Courses</h4>
//       <div class="course-chips">${c.courses.map(co => `<span class="course-chip">${co}</span>`).join('')}</div>
//     </div>
//     <div style="margin-top:20px;display:flex;gap:10px">
//       <button class="btn-apply" style="flex:1" onclick="toggleShortlist(${c.id});closeDetail();showShortlist()">
//         ${shortlistIds.has(c.id) ? '⭐ Already Shortlisted' : '☆ Add to Shortlist'}
//       </button>
//     </div>`;
//   document.getElementById('detailModal').classList.remove('hidden');
// }
// function closeDetail() { document.getElementById('detailModal').classList.add('hidden'); }
 
// // ─── Auth ─────────────────────────────────────────────────────
// function togglePassword() {
//   const pw = document.getElementById('loginPassword');
//   pw.type = pw.type === 'password' ? 'text' : 'password';
// }
// function showAlert(msg, type = 'error') {
//   const el = document.getElementById('loginAlert');
//   el.className = `alert ${type}`;
//   el.textContent = msg;
//   el.classList.remove('hidden');
//   setTimeout(() => el.classList.add('hidden'), 4000);
// }
// function handleLogin() {
//   const name  = document.getElementById('loginName').value.trim();
//   const email = document.getElementById('loginEmail').value.trim();
//   const pw    = document.getElementById('loginPassword').value;
//   if (!name)  return showAlert('Please enter your full name.');
//   if (!email) return showAlert('Please enter your email address.');
//   if (!pw)    return showAlert('Please enter your password.');
//   if (!email.includes('@')) return showAlert('Please enter a valid email address.');
//   if (pw.length < 4) return showAlert('Password must be at least 4 characters.');
//   showAlert('Signing in…', 'success');
//   setTimeout(() => goToStreamPage(name), 900);
// }
// function handleDemoLogin() { goToStreamPage('Demo Student'); }
 
// function goToStreamPage(name) {
//   if (name) currentUser = name;
//   document.getElementById('loginPage').classList.remove('active');
//   document.getElementById('mainPage').classList.remove('active');
//   document.getElementById('streamPage').classList.add('active');
//   currentStream = null;
//   document.getElementById('continueBtn').disabled = true;
//   document.querySelectorAll('.stream-card').forEach(c => c.classList.remove('selected'));
//   renderStreamCards();
// }
 
// function proceedToMain(skipStream) {
//   if (skipStream) currentStream = null;
//   const stream = STREAMS.find(s => s.id === currentStream);
//   document.getElementById('navWelcome').textContent = `Welcome, ${currentUser}`;
 
//   if (stream) {
//     document.getElementById('navStreamBadge').textContent = `${stream.icon} ${stream.name}`;
//     document.getElementById('navStreamBadge').style.display = 'flex';
//     document.getElementById('heroStreamName').textContent = stream.name;
//     document.getElementById('heroStreamPill').style.display = 'inline-flex';
//     document.getElementById('heroBannerDesc').textContent =
//       `Showing universities offering ${stream.name} programs across 4 states`;
//   } else {
//     document.getElementById('navStreamBadge').style.display = 'none';
//     document.getElementById('heroStreamPill').style.display = 'none';
//     document.getElementById('heroBannerDesc').textContent =
//       'Browse 100 universities across 4 states — filter, compare, and shortlist your top choices';
//   }
 
//   document.getElementById('streamPage').classList.remove('active');
//   document.getElementById('mainPage').classList.add('active');
 
//   currentState      = 'all';
//   _scrollTypeFilter = 'all';
//   document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
//   document.querySelector('.tab[data-state="all"]').classList.add('active');
//   document.getElementById('activeStateLabel').textContent = 'All States';
//   document.getElementById('searchInput').value       = '';
//   document.getElementById('scrollSearchInput').value = '';
//   document.getElementById('sortSelect').value = currentStream ? 'rating' : 'default';
 
//   renderIITSection();
//   renderNITSection();
//   filterColleges();
//   initGeolocation();
// }
 
// function handleLogout() {
//   if (!confirm('Are you sure you want to logout?')) return;
//   currentUser = null; currentStream = null; currentState = 'all';
//   shortlistIds.clear(); showingNearby = false; userLat = null; userLng = null;
//   geoRequested = false; _scrollTypeFilter = 'all';
//   document.getElementById('shortlistCount').textContent = 0;
//   document.getElementById('mainPage').classList.remove('active');
//   document.getElementById('streamPage').classList.remove('active');
//   document.getElementById('loginPage').classList.add('active');
//   document.getElementById('loginName').value = '';
//   document.getElementById('loginEmail').value = '';
//   document.getElementById('loginPassword').value = '';
//   document.getElementById('nearbyBar').classList.add('hidden');
//   document.getElementById('scrollFilterBar').classList.remove('visible');
// }
 
// function showRegister() { showAlert('Registration coming soon! Use Demo Login to explore.', 'success'); }
 
// // ─── Feedback ─────────────────────────────────────────────────
// const STAR_LABELS = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
 
// function hoverRating(val) {
//   document.querySelectorAll('#starRating .star').forEach(s => {
//     s.classList.toggle('hovered', parseInt(s.dataset.val) <= val);
//     s.classList.remove('selected');
//   });
//   document.getElementById('starLabel').textContent = STAR_LABELS[val];
// }
// function unhoverRating() {
//   document.querySelectorAll('#starRating .star').forEach(s => {
//     s.classList.remove('hovered');
//     s.classList.toggle('selected', parseInt(s.dataset.val) <= fbRating);
//   });
//   document.getElementById('starLabel').textContent = fbRating > 0 ? STAR_LABELS[fbRating] : 'Click to rate';
// }
// function setRating(val) {
//   fbRating = val;
//   document.querySelectorAll('#starRating .star').forEach(s => {
//     s.classList.toggle('selected', parseInt(s.dataset.val) <= val);
//     s.classList.remove('hovered');
//   });
//   document.getElementById('starLabel').textContent = STAR_LABELS[val];
// }
// function toggleChip(el) { el.classList.toggle('selected'); }
// function setRecommend(val) {
//   fbRecommend = val;
//   document.getElementById('fbRecYes').className   = 'fb-rec-btn' + (val === 'yes'   ? ' selected-yes'   : '');
//   document.getElementById('fbRecMaybe').className = 'fb-rec-btn' + (val === 'maybe' ? ' selected-maybe' : '');
//   document.getElementById('fbRecNo').className    = 'fb-rec-btn' + (val === 'no'    ? ' selected-no'    : '');
// }
// function submitFeedback() {
//   const name  = document.getElementById('fbName').value.trim();
//   const errEl = document.getElementById('fbError');
//   if (!name || fbRating === 0) {
//     errEl.classList.remove('hidden');
//     errEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     return;
//   }
//   errEl.classList.add('hidden');
//   document.getElementById('feedbackFormBody').style.display = 'none';
//   document.getElementById('feedbackSuccess').classList.remove('hidden');
// }
// function resetFeedback() {
//   fbRating = 0; fbRecommend = null;
//   document.getElementById('fbName').value    = '';
//   document.getElementById('fbEmail').value   = '';
//   document.getElementById('fbMessage').value = '';
//   document.querySelectorAll('#starRating .star').forEach(s => s.classList.remove('selected','hovered'));
//   document.getElementById('starLabel').textContent = 'Click to rate';
//   document.querySelectorAll('#fbLikeChips .fb-chip').forEach(c => c.classList.remove('selected'));
//   setRecommend(null);
//   document.getElementById('fbError').classList.add('hidden');
//   document.getElementById('feedbackFormBody').style.display = '';
//   document.getElementById('feedbackSuccess').classList.add('hidden');
// }
 
// // ─── Modal close ─────────────────────────────────────────────
// document.getElementById('shortlistModal').addEventListener('click', function(e) { if (e.target === this) closeShortlist(); });
// document.getElementById('detailModal').addEventListener('click', function(e) { if (e.target === this) closeDetail(); });
// document.addEventListener('keydown', e => {
//   if (e.key === 'Escape') { closeShortlist(); closeDetail(); }
// });




"use strict";
 
// ─── State ──────────────────────────────────────────────────
let currentUser = localStorage.getItem("loggedInUser");
document.addEventListener("DOMContentLoaded", function () {
    
    const userBox = document.getElementById("welcomeUser");

    if(userBox){
        userBox.innerText = "Welcome, " + (currentUser || "Demo Student");
    }

});
let currentState  = 'all';
let currentStream = null;
let shortlistIds  = new Set();
let userLat       = null;
let userLng       = null;
let showingNearby = false;
let geoRequested  = false;
let fbRating      = 0;
let fbRecommend   = null;
let _scrollTypeFilter = 'all';
let _suggestionIndex  = -1;
 
// ─── Streams ─────────────────────────────────────────────────
const STREAMS = [
  { id:'engineering',  name:'Engineering & Technology', icon:'⚙️',  desc:'BTech, MTech, Architecture', keywords:['BTech','MTech','BEng','Engineering','Architecture'] },
  { id:'medical',      name:'Medical & Health Sciences',icon:'🏥',  desc:'MBBS, BDS, MD, Pharmacy',   keywords:['MBBS','BDS','MD','MS','DM','MCh','BPharma','BAMS','BSc Nursing','Nursing'] },
  { id:'law',          name:'Law & Legal Studies',      icon:'⚖️',  desc:'LLB, LLM, Integrated Law',  keywords:['LLB','LLM','Law'] },
  { id:'management',   name:'Management & Business',    icon:'💼',  desc:'MBA, BBA, BCom, PGDM',      keywords:['MBA','BBA','BCom','PGDM','Executive MBA','Commerce','Management'] },
  { id:'arts',         name:'Arts & Humanities',        icon:'📚',  desc:'BA, MA, Social Sciences',    keywords:['BA','MA','MSW','Humanities','Social','Sanskrit','Arabic','Persian','Buddhist','Historical'] },
  { id:'science',      name:'Science & Research',       icon:'🔬',  desc:'BSc, MSc, PhD programs',     keywords:['BSc','MSc','PhD','Science','Ecology','MSc Sociology'] },
  { id:'agriculture',  name:'Agriculture & Veterinary', icon:'🌾',  desc:'BSc Agriculture, Food Tech', keywords:['Agriculture','Agri','Food Tech','BTech Food','Veterinary'] },
  { id:'computer',     name:'Computer Science & IT',    icon:'💻',  desc:'BCA, MCA, IT programs',      keywords:['BCA','MCA','Computer','MCA'] },
  { id:'design',       name:'Design & Media',           icon:'🎨',  desc:'Design, Media, Fine Arts',    keywords:['Design','Media','Architecture','Fine Arts'] },
  { id:'education',    name:'Education & Teaching',     icon:'🏫',  desc:'BEd, MEd, Teacher Training', keywords:['BEd','MEd','Education','Teaching'] }
];
 
// ─── City Coordinates ────────────────────────────────────────
const CITY_COORDS = {
  'Chandigarh':[30.7333,76.7794],'Amritsar':[31.6340,74.8723],'Patiala':[30.3398,76.3869],
  'Phagwara':[31.2241,75.7728],'Mohali':[30.7046,76.7179],'Rupnagar':[30.9654,76.5215],
  'Jalandhar':[31.3260,75.5762],'Rajpura':[30.4838,76.5900],'Ludhiana':[30.9010,75.8573],
  'Faridkot':[30.6765,74.7598],'Bathinda':[30.2110,74.9455],'Fatehgarh Sahib':[30.6490,76.3904],
  'Sirmour':[30.5614,77.2089],'Kurukshetra':[29.9695,76.8783],'Rohtak':[28.8955,76.6066],
  'Hisar':[29.1492,75.7217],'Sonipat':[28.9931,77.0151],'Faridabad':[28.4089,77.3178],
  'Sirsa':[29.5348,74.9775],'Gurugram':[28.4595,77.0266],'Ambala':[30.3782,76.7767],
  'Mahendergarh':[28.2743,76.1500],'Murthal':[28.9977,76.9969],'Meerpur':[28.6500,76.6000],
  'Panipat':[29.3909,76.9635],'Prayagraj':[25.4358,81.8463],'Varanasi':[25.3176,82.9739],
  'Aligarh':[27.8974,78.0880],'Lucknow':[26.8467,80.9462],'Kanpur':[26.4499,80.3319],
  'Noida':[28.5355,77.3910],'Greater Noida':[28.4744,77.5040],'Meerut':[28.9845,77.7064],
  'Jhansi':[25.4484,78.5685],'Gorakhpur':[26.7606,83.3732],'Ayodhya':[26.7922,82.1998],
  'Jaunpur':[25.7463,82.6838],'Bareilly':[28.3670,79.4304],'Patna':[25.5941,85.1376],
  'Bodh Gaya':[24.6961,84.9913],'Gaya':[24.7914,85.0002],'Rajgir':[25.0269,85.4191],
  'Darbhanga':[26.1542,85.8918],'Muzaffarpur':[26.1197,85.3910],'Sabour':[25.2285,87.0520],
  'Ara':[25.5562,84.6618],'Chapra':[25.7815,84.7478],'Bhagalpur':[25.2425,86.9842],
  'Munger':[25.3752,86.4735],'Purnia':[25.7771,87.4753],'Madhepura':[25.9208,86.7926]
};

// ─── Detect Location (REAL WORKING) ──────────────────────────
function detectLocation() {
  const tag     = document.getElementById('navLocationTag');
  const locIcon = document.getElementById('navLocIcon');
  const locText = document.getElementById('navLocText');

  if (!navigator.geolocation) {
    locText.textContent = 'Not supported';
    return;
  }

  // Already detected — toggle nearby filter
  if (geoRequested && userLat !== null) {
    toggleNearby();
    return;
  }

  // Show loading state
  locIcon.textContent = '⏳';
  locText.textContent = 'Detecting…';
  tag.style.borderColor = '#f59e0b';
  tag.style.background  = '#fffbeb';

  navigator.geolocation.getCurrentPosition(
    pos => {
      userLat      = pos.coords.latitude;
      userLng      = pos.coords.longitude;
      geoRequested = true;

      // Reverse-geocode: find nearest city name
      const nearestCity = findNearestCity(userLat, userLng);

      locIcon.textContent  = '';
      locText.textContent  = nearestCity ? `Near ${nearestCity}` : `${userLat.toFixed(2)}°, ${userLng.toFixed(2)}°`;
      tag.style.borderColor = '#10b981';
      tag.style.background  = '#ecfdf5';
      tag.style.color       = '#065f46';
      tag.title             = 'Click to toggle nearby colleges';

      // Show nearby bar and activate nearby filter
      const bar = document.getElementById('nearbyBar');
      bar.classList.remove('hidden');
      document.getElementById('nearbyBarText').innerHTML =
        `Location: <strong>${nearestCity || 'Detected'}</strong> — showing colleges within 200 km`;
      document.getElementById('nearbyBtn').style.display = '';
      document.getElementById('nearbyBtn').textContent   = 'Show Nearby Colleges';

      // Auto-sort by distance
      document.getElementById('sortSelect').value = 'distance';
      showingNearby = true;
      document.getElementById('nearbyBtn').textContent = 'Clear Nearby Filter';
      document.getElementById('nearbyPill').classList.remove('hidden');
      filterColleges();
    },
    err => {
      locIcon.textContent  = '⚠️';
      locText.textContent  = 'Location denied';
      tag.style.borderColor = '#f87171';
      tag.style.background  = '#fef2f2';
      tag.style.color       = '#b91c1c';

      let msg = 'Location access was denied.';
      if (err.code === err.TIMEOUT)          msg = 'Location request timed out.';
      if (err.code === err.POSITION_UNAVAILABLE) msg = 'Location unavailable.';
      alert(msg + ' Please allow location access in your browser to use this feature.');
    },
    { timeout: 10000, enableHighAccuracy: true }
  );
}

// Find the nearest city from CITY_COORDS to user's coordinates
function findNearestCity(lat, lng) {
  let nearestCity = null;
  let minDist     = Infinity;
  for (const [city, coords] of Object.entries(CITY_COORDS)) {
    const d = haversine(lat, lng, coords[0], coords[1]);
    if (d < minDist) { minDist = d; nearestCity = city; }
  }
  // Only return city name if within 100 km, else just show coordinates
  return minDist < 100 ? nearestCity : null;
}
 
// ─── College Data ─────────────────────────────────────────────
const COLLEGES=[
  {id:1,state:'Punjab',name:'Panjab University',city:'Chandigarh',type:'Government',estd:1947,rating:4.6,courses:['BA','BSc','BCom','MA','MSc','LLB','MBA','PhD','BBA','BCA','BPharma'],fees:'₹12,000 – ₹45,000 / yr',intake:5000,accreditation:'NAAC A++'},
  {id:2,state:'Punjab',name:'Guru Nanak Dev University',city:'Amritsar',type:'Government',estd:1969,rating:4.4,courses:['BA','BSc','BCom','MBA','MCA','BEd','PhD'],page:'gurunanakdevuniversity.html',fees:'₹10,000 – ₹40,000 / yr',intake:4500,accreditation:'NAAC A+'},
  {id:3,state:'Punjab',name:'Thapar Institute of Engineering & Technology',city:'Patiala',type:'Deemed',estd:1956,rating:4.7,courses:['BTech','MTech','MBA','MCA','PhD'],page:'./thaparinstitude.html',fees:'₹2,50,000 – ₹3,50,000 / yr',intake:2200,accreditation:'NAAC A'},
  {id:4,state:'Punjab',name:'Lovely Professional University',city:'Phagwara',type:'Private',estd:2005,rating:4.3,courses:['BTech','BBA','BCom','MBBS','MBA','LLB','Design'],page:'lpupunjab.html',fees:'₹80,000 – ₹2,00,000 / yr',intake:30000,accreditation:'NAAC A+'},
  {id:5,state:'Punjab',name:'Chandigarh University',city:'Mohali',type:'Private',estd:2012,rating:4.4,courses:['BTech','MBA','MCA','BPharma','LLB','Design'],page:'chandigarhuniversity.html',fees:'₹1,20,000 – ₹2,20,000 / yr',intake:25000,accreditation:'NAAC A+'},
  {id:6,state:'Punjab',name:'IIT Ropar',city:'Rupnagar',type:'Central',estd:2008,rating:4.8,courses:['BTech','MTech','MSc','PhD'],page:'iitropar.html',fees:'₹2,00,000 – ₹2,50,000 / yr',intake:800,accreditation:'NAAC A',isIIT:true},
  {id:7,state:'Punjab',name:'NIT Jalandhar',city:'Jalandhar',type:'Central',estd:1987,rating:4.6,courses:['BTech','MTech','MCA','MBA','PhD'],page:'nitjalandhar.html',fees:'₹1,50,000 – ₹2,00,000 / yr',intake:1800,accreditation:'NAAC A',isNIT:true},
  {id:8,state:'Punjab',name:'Punjabi University',city:'Patiala',type:'Government',estd:1962,rating:4.2,courses:['BA','BSc','BCom','MA','LLB','BEd','MBA'],page:'punjabiuniversity.html',fees:'₹8,000 – ₹35,000 / yr',intake:3500,accreditation:'NAAC A'},
  {id:9,state:'Punjab',name:'Chitkara University',city:'Rajpura',type:'Private',estd:2010,rating:4.3,courses:['BTech','MBA','MCA','BPharma','Architecture'],page:'chitkarauniversity.html',fees:'₹1,00,000 – ₹2,50,000 / yr',intake:6000,accreditation:'NAAC A'},
  {id:10,state:'Punjab',name:'DAV University',city:'Jalandhar',type:'Private',estd:2012,rating:3.9,courses:['BTech','BBA','BCom','MA','MBA','BEd'],page:'DAVuniversity.html',fees:'₹60,000 – ₹1,50,000 / yr',intake:3000,accreditation:'NAAC B+'},
  {id:11,state:'Punjab',name:'Central University of Punjab',city:'Bathinda',type:'Central',estd:2009,rating:4.3,courses:['MA','MSc','MBA','LLM','PhD','BTech','MTech','LLB','BSc','BA','BPharma'],page:'centraluniversityofpunjab.html',fees:'₹15,000 – ₹50,000 / yr',intake:2000,accreditation:'NAAC A'},
  {id:12,state:'Punjab',name:'Amity University Punjab',city:'Mohali',type:'Private',estd:2015,rating:4.1,courses:['BTech','BBA','BCom','MBA','LLB','BCA'],fees:'₹1,50,000 – ₹2,80,000 / yr',intake:4000,accreditation:'NAAC A+'},
  {id:13,state:'Punjab',name:'GNA University',city:'Phagwara',type:'Private',estd:2014,rating:3.8,courses:['BTech','BBA','MBA','BCA','BPharma'],page:'gnauniversity.html',fees:'₹70,000 – ₹1,60,000 / yr',intake:2500,accreditation:'NAAC B+'},
  {id:14,state:'Punjab',name:'Punjab Agricultural University',city:'Ludhiana',type:'Government',estd:1962,rating:4.5,courses:['BSc Agriculture','BTech','MSc','PhD'],page:'punjabagricultureuniversity.html',fees:'₹20,000 – ₹60,000 / yr',intake:1500,accreditation:'NAAC A'},
  {id:15,state:'Punjab',name:'Baba Farid University of Health Sciences',city:'Faridkot',type:'Government',estd:1998,rating:4.2,courses:['MBBS','BDS','BAMS','BPharma','BSc Nursing','MD'],page:'babafariduniversity.html',fees:'₹80,000 – ₹5,00,000 / yr',intake:1200,accreditation:'NAAC B+'},
  {id:16,state:'Punjab',name:'Rayat Bahra University',city:'Mohali',type:'Private',estd:2011,rating:3.8,courses:['BTech','BPharma','BBA','MBA','LLB'],fees:'₹60,000 – ₹1,50,000 / yr',intake:3000,accreditation:'NAAC B+'},
  {id:17,state:'Punjab',name:'Sri Guru Ram Dass University of Health Sciences',city:'Amritsar',type:'Government',estd:2012,rating:4.0,courses:['MBBS','BDS','MD','MS','BSc Nursing'],page:'srigururamdasuniversity.html',fees:'₹1,00,000 – ₹6,00,000 / yr',intake:800,accreditation:'NAAC B+'},
  {id:18,state:'Punjab',name:'Adesh University',city:'Bathinda',type:'Private',estd:2012,rating:3.9,courses:['MBBS','BPharma','BTech','MBA','BSc Nursing'],page:'adeshuniversity.html',fees:'₹90,000 – ₹5,50,000 / yr',intake:1500,accreditation:'NAAC B'},
  {id:19,state:'Punjab',name:'Eternal University',city:'Sirmour',type:'Private',estd:2009,rating:3.7,courses:['BTech','BBA','MBA','MSc','PhD'],page:'entwenaluniversity.html',fees:'₹60,000 – ₹1,50,000 / yr',intake:2000,accreditation:'NAAC B'},
  {id:20,state:'Punjab',name:'UIET Panjab University',city:'Chandigarh',type:'Government',estd:1999,rating:4.5,courses:['BTech','MTech','MCA'],page:'uietuniversity.html',fees:'₹75,000 – ₹1,10,000 / yr',intake:900,accreditation:'NAAC A++'},
  {id:21,state:'Punjab',name:'Sri Guru Granth Sahib World University',city:'Fatehgarh Sahib',type:'Government',estd:2008,rating:4.0,courses:['BA','BCom','BCA','MBA','MSc','MCA'],fees:'₹18,000 – ₹50,000 / yr',intake:1800,accreditation:'NAAC B+'},
  {id:22,state:'Punjab',name:'IK Gujral Punjab Technical University',city:'Jalandhar',type:'Government',estd:1997,rating:4.2,courses:['BTech','MBA','MCA','BPharma','LLB'],fees:'₹50,000 – ₹1,50,000 / yr',intake:10000,accreditation:'NAAC B+'},
  {id:23,state:'Punjab',name:'RIMT University',city:'Fatehgarh Sahib',type:'Private',estd:2015,rating:3.7,courses:['BTech','BBA','MBA','BCA','BPharma'],fees:'₹65,000 – ₹1,40,000 / yr',intake:2500,accreditation:'NAAC B'},
  {id:24,state:'Punjab',name:'Khalsa College',city:'Amritsar',type:'Government-Aided',estd:1892,rating:4.3,courses:['BA','BSc','BCom','BCA','MA'],fees:'₹8,000 – ₹25,000 / yr',intake:2000,accreditation:'NAAC A'},
  {id:25,state:'Punjab',name:'CT University',city:'Ludhiana',type:'Private',estd:2015,rating:3.8,courses:['BTech','BBA','MBA','LLB','BPharma'],fees:'₹70,000 – ₹1,60,000 / yr',intake:3000,accreditation:'NAAC B+'},
  {id:26,state:'Haryana',name:'Kurukshetra University',city:'Kurukshetra',type:'Government',estd:1956,rating:4.4,courses:['BA','BSc','BCom','MA','MBA','LLB','PhD'],page:'kurukshetrauniversity.html',fees:'₹10,000 – ₹35,000 / yr',intake:5000,accreditation:'NAAC A+'},
  {id:27,state:'Haryana',name:'Maharishi Dayanand University',city:'Rohtak',type:'Government',estd:1976,rating:4.2,courses:['BA','BCom','BSc','BEd','MBA','LLB','PhD'],fees:'₹12,000 – ₹40,000 / yr',intake:4500,accreditation:'NAAC A'},
  {id:28,state:'Haryana',name:'Guru Jambheshwar University of Science & Tech',city:'Hisar',type:'Government',estd:1995,rating:4.1,courses:['BTech','MBA','MCA','MSc','PhD'],fees:'₹15,000 – ₹45,000 / yr',intake:2500,accreditation:'NAAC A'},
  {id:29,state:'Haryana',name:'NIT Kurukshetra',city:'Kurukshetra',type:'Central',estd:1963,rating:4.7,courses:['BTech','MTech','MCA','MBA','PhD'],fees:'₹1,50,000 – ₹2,00,000 / yr',intake:1900,accreditation:'NAAC A+',isNIT:true},
  {id:30,state:'Haryana',name:'Ashoka University',city:'Sonipat',type:'Private',estd:2014,rating:4.7,courses:['BA (Hons)','BSc','MA','PhD','MBA'],page:'ashokauniversity.html',fees:'₹6,00,000 – ₹8,00,000 / yr',intake:800,accreditation:'NAAC A'},
  {id:31,state:'Haryana',name:'O.P. Jindal Global University',city:'Sonipat',type:'Private',estd:2009,rating:4.6,courses:['LLB','BBA','BA','MBA','MA','LLM'],page:'opglobaluniversity.html;',fees:'₹4,00,000 – ₹7,00,000 / yr',intake:2000,accreditation:'NAAC A+'},
  {id:32,state:'Haryana',name:'Manav Rachna University',city:'Faridabad',type:'Private',estd:2014,rating:4.0,courses:['BTech','BBA','MBA','BCA','BPharma'],fees:'₹1,00,000 – ₹2,20,000 / yr',intake:4000,accreditation:'NAAC A'},
  {id:33,state:'Haryana',name:'MM University Mullana',city:'Ambala',type:'Private',estd:2010,rating:4.0,courses:['BTech','MBA','BPharma','MBBS','BDS'],fees:'₹90,000 – ₹2,50,000 / yr',intake:5000,accreditation:'NAAC A'},
  {id:34,state:'Haryana',name:'YMCA University of Science & Technology',city:'Faridabad',type:'Government',estd:2009,rating:4.2,courses:['BTech','MTech','MBA','MCA'],fees:'₹40,000 – ₹80,000 / yr',intake:1500,accreditation:'NAAC A'},
  {id:35,state:'Haryana',name:'Chaudhary Devi Lal University',city:'Sirsa',type:'Government',estd:2003,rating:4.0,courses:['BA','BCom','BSc','BEd','MA','MBA'],page:'cdlu.html',fees:'₹10,000 – ₹35,000 / yr',intake:2500,accreditation:'NAAC B+'},
  {id:36,state:'Haryana',name:'GD Goenka University',city:'Gurugram',type:'Private',estd:2013,rating:4.1,courses:['BTech','BBA','MBA','LLB','Design','Media'],fees:'₹1,50,000 – ₹3,00,000 / yr',intake:3500,accreditation:'NAAC B+'},
  {id:37,state:'Haryana',name:'The NorthCap University',city:'Gurugram',type:'Private',estd:2009,rating:4.0,courses:['BTech','MBA','BCA','MCA','LLB'],fees:'₹1,20,000 – ₹2,60,000 / yr',intake:2000,accreditation:'NAAC A'},
  {id:38,state:'Haryana',name:'Lingayas Vidyapeeth',city:'Faridabad',type:'Private',estd:2009,rating:3.9,courses:['BTech','BBA','MBA','BCA','BPharma'],fees:'₹80,000 – ₹1,80,000 / yr',intake:3500,accreditation:'NAAC B+'},
  {id:39,state:'Haryana',name:'Amity University Haryana',city:'Gurugram',type:'Private',estd:2010,rating:4.1,courses:['BTech','BBA','BCom','MBA','LLB','Design'],page:'amityuniversity.html',fees:'₹1,50,000 – ₹2,80,000 / yr',intake:4000,accreditation:'NAAC A+'},
  {id:40,state:'Haryana',name:'SRM University Haryana',city:'Sonipat',type:'Private',estd:2013,rating:4.0,courses:['BTech','BBA','MBA','MCA','BPharma'],page:'srmuniversity.html',fees:'₹1,20,000 – ₹2,40,000 / yr',intake:3000,accreditation:'NAAC A'},
  {id:41,state:'Haryana',name:'Starex University',city:'Gurugram',type:'Private',estd:2016,rating:3.7,courses:['BTech','BBA','LLB','MBA','BCA'],page:'starexuniversity.html',fees:'₹70,000 – ₹1,50,000 / yr',intake:2000,accreditation:'NAAC B'},
  {id:42,state:'Haryana',name:'Bhagat Phool Singh Mahila Vishwavidyalaya',city:'Sonipat',type:'Government',estd:2006,rating:4.0,courses:['BA','BSc','BCom','BEd','MA','MBA'],fees:'₹8,000 – ₹30,000 / yr',intake:2000,accreditation:'NAAC A'},
  {id:43,state:'Haryana',name:'Central University of Haryana',city:'Mahendergarh',type:'Central',estd:2009,rating:4.3,courses:['MA','MSc','MBA','LLM','PhD','BTech','MTech'],page:'centraluniversityofharyana.html',fees:'₹15,000 – ₹50,000 / yr',intake:1500,accreditation:'NAAC A'},
  {id:44,state:'Haryana',name:'Deenbandhu Chhotu Ram University',city:'Murthal',type:'Government',estd:2006,rating:4.1,courses:['BTech','MBA','MCA','MTech'],page:'dcrustmuthal.html',fees:'₹30,000 – ₹80,000 / yr',intake:2000,accreditation:'NAAC B+'},
  {id:45,state:'Haryana',name:'CCS Haryana Agricultural University',city:'Hisar',type:'Government',estd:1970,rating:4.4,courses:['BSc Agriculture','BTech','MSc','PhD'],page:'chaudharycharansinghharyana.html',fees:'₹20,000 – ₹55,000 / yr',intake:1500,accreditation:'NAAC A'},
  {id:46,state:'Haryana',name:'NIFTEM Sonipat',city:'Sonipat',type:'Central',estd:2012,rating:4.3,courses:['BTech Food Tech','MTech','MBA','PhD'],page:'niftem.html',fees:'₹1,00,000 – ₹1,80,000 / yr',intake:600,accreditation:'NAAC A'},
  {id:47,state:'Haryana',name:'Indira Gandhi University',city:'Meerpur',type:'Government',estd:2013,rating:3.9,courses:['BA','BCom','BSc','BEd','MA'],page:'indiragandhiuniversity.html',fees:'₹8,000 – ₹28,000 / yr',intake:2000,accreditation:'NAAC B+'},
  {id:48,state:'Haryana',name:'MRIIRS University',city:'Faridabad',type:'Private',estd:2014,rating:3.9,courses:['BTech','MBA','BCA','BBA','LLB'],page:'mriirsuniversity.html',fees:'₹80,000 – ₹1,80,000 / yr',intake:3000,accreditation:'NAAC B+'},
  {id:49,state:'Haryana',name:'SGT University',city:'Gurugram',type:'Private',estd:2013,rating:4.0,courses:['MBBS','BDS','BPharma','BTech','MBA'],page:'sgtuniversity.html',fees:'₹1,00,000 – ₹6,00,000 / yr',intake:3500,accreditation:'NAAC B+'},
  {id:50,state:'Haryana',name:'Panipat Institute of Engineering and Technology',city:'Panipat',type:'Private',estd:2005,rating:3.8,courses:['BTech','MBA','MCA','BCA'],page:'panipatinstitude.html',fees:'₹60,000 – ₹1,30,000 / yr',intake:2500,accreditation:'NAAC B'},
  {id:51,state:'Uttar Pradesh',name:'University of Allahabad',city:'Prayagraj',type:'Central',estd:1887,rating:4.6,courses:['BA','BSc','BCom','MA','LLB','MBA','PhD'],fees:'₹8,000 – ₹35,000 / yr',intake:6000,accreditation:'NAAC A+'},
  {id:52,state:'Uttar Pradesh',name:'Banaras Hindu University',city:'Varanasi',type:'Central',estd:1916,rating:4.8,courses:['BA','BSc','BCom','MBBS','LLB','BTech','PhD'],page:'bhuuniversity.html',fees:'₹5,000 – ₹30,000 / yr',intake:15000,accreditation:'NAAC A++'},
  {id:53,state:'Uttar Pradesh',name:'Aligarh Muslim University',city:'Aligarh',type:'Central',estd:1875,rating:4.7,courses:['BA','BSc','MBBS','BTech','LLB','MBA','PhD'],page:'aligarhmuslimuniversity.html',fees:'₹6,000 – ₹30,000 / yr',intake:12000,accreditation:'NAAC A+'},
  {id:54,state:'Uttar Pradesh',name:'University of Lucknow',city:'Lucknow',type:'Government',estd:1921,rating:4.5,courses:['BA','BSc','BCom','MA','LLB','MBA','PhD'],page:'universityoflucknow.html',fees:'₹8,000 – ₹30,000 / yr',intake:8000,accreditation:'NAAC A+'},
  {id:55,state:'Uttar Pradesh',name:'IIT Kanpur',city:'Kanpur',type:'Central',estd:1959,rating:4.9,courses:['BTech','MTech','MSc','MBA','PhD'],page:'IITKANPUR.html',fees:'₹2,00,000 – ₹2,50,000 / yr',intake:1500,accreditation:'NAAC A++',isIIT:true},
  {id:56,state:'Uttar Pradesh',name:'IIT (BHU) Varanasi',city:'Varanasi',type:'Central',estd:1968,rating:4.8,courses:['BTech','MTech','MSc','Integrated Dual','PhD'],page:'iitbhu.html',fees:'₹1,80,000 – ₹2,30,000 / yr',intake:1700,accreditation:'NAAC A+',isIIT:true},
  {id:57,state:'Uttar Pradesh',name:'MNNIT Allahabad',city:'Prayagraj',type:'Central',estd:1961,rating:4.7,courses:['BTech','MTech','MCA','MBA','PhD'],page:'mnitallahabad.html',fees:'₹1,50,000 – ₹2,00,000 / yr',intake:1600,accreditation:'NAAC A',isNIT:true},
  {id:58,state:'Uttar Pradesh',name:'Amity University Noida',city:'Noida',type:'Private',estd:2003,rating:4.4,courses:['BTech','BBA','LLB','MBBS','MBA','Design'],page:'amity.html',fees:'₹2,00,000 – ₹4,00,000 / yr',intake:20000,accreditation:'NAAC A+'},
  {id:59,state:'Uttar Pradesh',name:'Sharda University',city:'Greater Noida',type:'Private',estd:2009,rating:4.2,courses:['BTech','MBA','MBBS','BCA','LLB','BBA'],page:'shardhauniversity.html',fees:'₹1,20,000 – ₹3,00,000 / yr',intake:10000,accreditation:'NAAC A'},
  {id:60,state:'Uttar Pradesh',name:'Galgotias University',city:'Greater Noida',type:'Private',estd:2011,rating:4.1,courses:['BTech','MBA','MCA','BCA','BBA'],page:'galgotiesuniversity.html',fees:'₹1,00,000 – ₹2,50,000 / yr',intake:12000,accreditation:'NAAC A'},
  {id:61,state:'Uttar Pradesh',name:'HBTU Kanpur',city:'Kanpur',type:'Government',estd:1966,rating:4.4,courses:['BTech','MTech','MBA','MCA','PhD'],page:'hbtukanpur.html',fees:'₹50,000 – ₹1,20,000 / yr',intake:2500,accreditation:'NAAC A'},
  {id:62,state:'Uttar Pradesh',name:'Dr. APJ Abdul Kalam Technical University',city:'Lucknow',type:'Government',estd:2000,rating:4.0,courses:['BTech','MBA','MCA','BPharma'],fees:'₹40,000 – ₹1,00,000 / yr',intake:50000,accreditation:'NAAC A'},
  {id:63,state:'Uttar Pradesh',name:'Chaudhary Charan Singh University',city:'Meerut',type:'Government',estd:1965,rating:4.1,courses:['BA','BSc','BCom','BEd','MA','MBA'],fees:'₹8,000 – ₹30,000 / yr',intake:4000,accreditation:'NAAC A'},
  {id:64,state:'Uttar Pradesh',name:'Bundelkhand University',city:'Jhansi',type:'Government',estd:1975,rating:4.0,courses:['BA','BSc','BCom','BTech','MA','MBA'],page:'bundelkhanduniversity.html',fees:'₹10,000 – ₹35,000 / yr',intake:3500,accreditation:'NAAC A'},
  {id:65,state:'Uttar Pradesh',name:'Deen Dayal Upadhyaya Gorakhpur University',city:'Gorakhpur',type:'Government',estd:1957,rating:4.0,courses:['BA','BSc','BCom','MA','LLB','PhD'],page:'dduuniversity.html',fees:'₹8,000 – ₹28,000 / yr',intake:4000,accreditation:'NAAC A'},
  {id:66,state:'Uttar Pradesh',name:'King George Medical University',city:'Lucknow',type:'Government',estd:1905,rating:4.7,courses:['MBBS','MD','MS','DM','BDS'],fees:'₹50,000 – ₹1,50,000 / yr',intake:1000,accreditation:'NAAC A+'},
  {id:67,state:'Uttar Pradesh',name:'Gautam Buddha University',city:'Greater Noida',type:'Government',estd:2002,rating:4.2,courses:['BTech','MBA','LLB','BCA','MA'],page:'gautambuddhauniversity.html',fees:'₹60,000 – ₹1,80,000 / yr',intake:3000,accreditation:'NAAC A'},
  {id:68,state:'Uttar Pradesh',name:'Babu Banarasi Das University',city:'Lucknow',type:'Private',estd:2010,rating:4.0,courses:['BTech','MBA','BPharma','MBBS','LLB'],page:'babubanarsidasuniversity.html',fees:'₹90,000 – ₹2,50,000 / yr',intake:5000,accreditation:'NAAC B+'},
  {id:69,state:'Uttar Pradesh',name:'Dr. Ram Manohar Lohia Avadh University',city:'Ayodhya',type:'Government',estd:1975,rating:3.9,courses:['BA','BCom','BSc','BEd','MA','MBA'],page:'drrammanoharavadhuniversity.html',fees:'₹8,000 – ₹28,000 / yr',intake:4000,accreditation:'NAAC B+'},
  {id:70,state:'Uttar Pradesh',name:'Veer Bahadur Singh Purvanchal University',city:'Jaunpur',type:'Government',estd:1987,rating:3.9,courses:['BA','BSc','BCom','BEd','MA'],page:'vbspujaunpur.html',fees:'₹7,000 – ₹25,000 / yr',intake:3500,accreditation:'NAAC B+'},
  {id:71,state:'Uttar Pradesh',name:'Integral  University',city:'Lucknow',type:'Private',estd:2004,rating:4.1,courses:['BTech','BBA','BPharma','MBA','MBBS'],page:'integraluniversity.html',fees:'₹80,000 – ₹2,50,000 / yr',intake:5000,accreditation:'NAAC A'},
  {id:72,state:'Uttar Pradesh',name:'Mahatma Jyotiba Phule Rohilkhand University',city:'Bareilly',type:'Government',estd:1975,rating:4.0,courses:['BA','BSc','BCom','BTech','MA','MBA'],page:'mjpruuniversity.html;',fees:'₹8,000 – ₹30,000 / yr',intake:3500,accreditation:'NAAC A'},
  {id:73,state:'Uttar Pradesh',name:'Noida International University',city:'Noida',type:'Private',estd:2010,rating:3.8,courses:['BTech','BBA','MBA','BCA','LLB'],page:'noidainternational.html',fees:'₹80,000 – ₹1,80,000 / yr',intake:4000,accreditation:'NAAC B+'},
  {id:74,state:'Uttar Pradesh',name:'Chhatrapati Shahu Ji Maharaj University',city:'Kanpur',type:'Government',estd:1966,rating:4.0,courses:['BA','BCom','BSc','BEd','MA','LLB'],fees:'₹7,000 – ₹25,000 / yr',intake:4500,accreditation:'NAAC A'},
  {id:75,state:'Uttar Pradesh',name:'Sanjay Gandhi Postgraduate Institute',city:'Lucknow',type:'Central',estd:1983,rating:4.8,courses:['MD','DM','MCh','PhD'],page:'sgpgimslucknow.html',fees:'₹30,000 – ₹80,000 / yr',intake:400,accreditation:'NAAC A++'},
  {id:76,state:'Bihar',name:'Patna University',city:'Patna',type:'Government',estd:1917,rating:4.3,courses:['BA','BSc','BCom','MA','LLB','MBA','PhD'],fees:'₹5,000 – ₹25,000 / yr',intake:6000,accreditation:'NAAC A'},
  {id:77,state:'Bihar',name:'Magadh University',city:'Bodh Gaya',type:'Government',estd:1962,rating:4.0,courses:['BA','BSc','BCom','MA','LLB','BEd'],fees:'₹5,000 – ₹20,000 / yr',intake:5000,accreditation:'NAAC B+'},
  {id:78,state:'Bihar',name:'NIT Patna',city:'Patna',type:'Central',estd:1886,rating:4.5,courses:['BTech','MTech','MCA','MBA','PhD'],page:'nitpatna.html',fees:'₹1,40,000 – ₹1,90,000 / yr',intake:1200,accreditation:'NAAC A',isNIT:true},
  {id:79,state:'Bihar',name:'IIT Patna',city:'Patna',type:'Central',estd:2008,rating:4.7,courses:['BTech','MTech','MSc','PhD'],page:'iitpatna.html',fees:'₹2,00,000 – ₹2,50,000 / yr',intake:900,accreditation:'NAAC A',isIIT:true},
  {id:80,state:'Bihar',name:'AIIMS Patna',city:'Patna',type:'Central',estd:2012,rating:4.8,courses:['MBBS','MD','MS','PhD','BSc Nursing'],page:'aiimspatna.html',fees:'₹10,000 – ₹30,000 / yr',intake:800,accreditation:'NAAC A+'},
  {id:81,state:'Bihar',name:'Central University of South Bihar',city:'Gaya',type:'Central',estd:2009,rating:4.3,courses:['MA','MSc','MBA','LLM','PhD'],fees:'₹15,000 – ₹50,000 / yr',intake:1500,accreditation:'NAAC A'},
  {id:82,state:'Bihar',name:'Nalanda University',city:'Rajgir',type:'Central',estd:2010,rating:4.5,courses:['MA Buddhist Studies','MA Ecology','MA Historical Studies','PhD'],page:'nalandauniversity.html',fees:'₹40,000 – ₹90,000 / yr',intake:400,accreditation:'NAAC A'},
  {id:83,state:'Bihar',name:'Lalit Narayan Mithila University',city:'Darbhanga',type:'Government',estd:1972,rating:4.0,courses:['BA','BSc','BCom','MA','LLB','BEd'],page:'lalitnarayanmithilauniversity.html',fees:'₹5,000 – ₹20,000 / yr',intake:5000,accreditation:'NAAC B+'},
  {id:84,state:'Bihar',name:'BR Ambedkar Bihar University',city:'Muzaffarpur',type:'Government',estd:1960,rating:3.9,courses:['BA','BCom','BSc','BEd','MA','LLB'],fees:'₹4,000 – ₹18,000 / yr',intake:5500,accreditation:'NAAC B+'},
  {id:85,state:'Bihar',name:'Aryabhatta Knowledge University',city:'Patna',type:'Government',estd:2008,rating:4.1,courses:['BTech','BPharma','MBBS','MBA','MCA'],page:'aryabhattaknowledgeuniversity.html',fees:'₹30,000 – ₹90,000 / yr',intake:5000,accreditation:'NAAC B+'},
  {id:86,state:'Bihar',name:'Bihar Agricultural University',city:'Sabour',type:'Government',estd:2010,rating:4.2,courses:['BSc Agriculture','MSc','PhD','BTech Agri Engg'],page:'biharagriculturaluniversity.html',fees:'₹20,000 – ₹60,000 / yr',intake:1000,accreditation:'NAAC B+'},
  {id:87,state:'Bihar',name:'Patliputra University',city:'Patna',type:'Government',estd:2018,rating:3.9,courses:['BA','BSc','BCom','BCA','MA'],page:'patliputraunniversity.html',fees:'₹5,000 – ₹18,000 / yr',intake:4000,accreditation:'NAAC B'},
  {id:88,state:'Bihar',name:'Veer Kunwar Singh University',city:'Ara',type:'Government',estd:1992,rating:3.9,courses:['BA','BSc','BCom','BEd','MA'],page:'veerkunwarsinghuniversity.html',fees:'₹4,000 – ₹18,000 / yr',intake:4000,accreditation:'NAAC B'},
  {id:89,state:'Bihar',name:'Jai Prakash University',city:'Chapra',type:'Government',estd:1990,rating:3.8,courses:['BA','BSc','BCom','BEd','MA','LLB'],page:'jaiprakashuniversity.html',fees:'₹4,000 – ₹16,000 / yr',intake:3500,accreditation:'NAAC B'},
  {id:90,state:'Bihar',name:'Tilka Manjhi Bhagalpur University',city:'Bhagalpur',type:'Government',estd:1960,rating:4.0,courses:['BA','BSc','BCom','MA','LLB','BEd'],fees:'₹5,000 – ₹20,000 / yr',intake:5000,accreditation:'NAAC B+'},
  {id:91,state:'Bihar',name:'Munger University',city:'Munger',type:'Government',estd:2018,rating:3.8,courses:['BA','BSc','BCom','BCA','MA'],page:'mungeruniversity.html',fees:'₹4,000 – ₹16,000 / yr',intake:3000,accreditation:'NAAC B'},
  {id:92,state:'Bihar',name:'Purnea University',city:'Purnia',type:'Government',estd:2018,rating:3.7,courses:['BA','BSc','BCom','MA'],page:'purneauniversity.html',fees:'₹4,000 – ₹15,000 / yr',intake:3000,accreditation:'NAAC B'},
  {id:93,state:'Bihar',name:'Bhupendra Narayan Mandal University',city:'Madhepura',type:'Government',estd:1992,rating:3.8,courses:['BA','BSc','BCom','BEd','MA','LLB'],fees:'₹4,000 – ₹18,000 / yr',intake:3500,accreditation:'NAAC B'},
  {id:94,state:'Bihar',name:'Kameshwar Singh Darbhanga Sanskrit University',city:'Darbhanga',type:'Government',estd:1961,rating:4.0,courses:['Sanskrit BA','Shastri','Acharya','MA Sanskrit','PhD'],page:'kameshwarsinghdarbhangasanskrituniversity.html',fees:'₹3,000 – ₹12,000 / yr',intake:2000,accreditation:'NAAC B+'},
  {id:95,state:'Bihar',name:'Chandragupt Institute of Management',city:'Patna',type:'Government',estd:2008,rating:4.4,courses:['MBA','PGDM','Executive MBA'],page:'cimpatna.html',fees:'₹2,00,000 – ₹4,00,000 / yr',intake:500,accreditation:'NAAC A'},
  {id:96,state:'Bihar',name:'IGIMS Patna',city:'Patna',type:'Government',estd:1983,rating:4.4,courses:['MBBS','MD','MS','BSc Nursing','PhD'],page:'igims.html',fees:'₹30,000 – ₹1,00,000 / yr',intake:600,accreditation:'NAAC A'},
  {id:97,state:'Bihar',name:'AN Sinha Institute of Social Studies',city:'Patna',type:'Government',estd:1951,rating:4.2,courses:['MA Sociology','MA Economics','MSW','PhD'],fees:'₹5,000 – ₹20,000 / yr',intake:600,accreditation:'NAAC A'},
  {id:98,state:'Bihar',name:'Maulana Mazharul Haque Arabic Persian University',city:'Patna',type:'Government',estd:1998,rating:3.9,courses:['BA Arabic','MA Arabic','MA Persian','PhD'],fees:'₹3,000 – ₹12,000 / yr',intake:800,accreditation:'NAAC B+'},
  {id:99,state:'Bihar',name:'Babasaheb Bhimrao Ambedkar Bihar University',city:'Muzaffarpur',type:'Government',estd:1952,rating:3.9,courses:['BA','BSc','BCom','BEd','MA','LLB'],page:'brabuuniversity.html',fees:'₹4,000 – ₹18,000 / yr',intake:5000,accreditation:'NAAC B+'},
  {id:100,state:'Bihar',name:'Darbhanga Medical College & Hospital',city:'Darbhanga',type:'Government',estd:1946,rating:4.2,courses:['MBBS','MD','MS','BSc Nursing'],fees:'₹40,000 – ₹1,00,000 / yr',intake:800,accreditation:'NAAC B+'},
  {id:101,state:'Uttar Pradesh',name:'Rani Lakshmi Bai Central Agricultural University',city:'Jhansi',type:'Central',estd:2014,rating:4.5,courses:['B.Sc Agriculture','B.Sc Horticulture','M.Sc','PhD'],page:'ranilaxmibaicentraluniversity.html',fees:'₹30,000 – ₹75,000 / yr',intake:120,accreditation:'ICAR'},
  {id:102,state:'Manipur',name:'Central Agricultural University',city:'Imphal',type:'Central',estd:1993,rating:4.5,courses:['B.Sc Agriculture','B.Sc Horticulture','B.Tech Agricultural Engineering','B.F.Sc','B.V.Sc','M.Sc','M.Tech','PhD'],page:'centralagriculturaluniversitymanipur.html',fees:'₹10,000 – ₹55,000 / yr',intake:1200,accreditation:'ICAR'},
  {id:103,state:'Assam',name:'Assam University',city:'Silchar',type:'Central',estd:1994,rating:4.4,courses:['B.Tech','B.Sc','B.A','B.Com','M.Sc','M.A','MBA','PhD'],page:'centraluniversityofassam.html',fees:'₹8,000 – ₹60,000 / yr',intake:1500,accreditation:'NAAC A'},
  {id:104,state:'Delhi',name:'South Asian University',city:'New Delhi',type:'Central',estd:2010,rating:4.4,courses:['B.Tech CSE','M.Sc','M.Tech','M.A','MBA','LLM','PhD'],page:'southasiauniversitydelhi.html',fees:'₹40,000 – ₹1,50,000 / yr',intake:1600,accreditation:'UGC'},
  {id:105,state:'Delhi',name:'Central Sanskrit University',city:'New Delhi',type:'Central',estd:1970,rating:4.4,courses:['B.A Sanskrit','B.Ed','M.A','M.Ed','Shastri','Acharya','PhD'],page:'centralsanskrituniversitydelhi.html',fees:'₹5,000 – ₹40,000 / yr',intake:5600,accreditation:'UGC'},
  // {id:106,state:'Andhra Pradesh',name:'Central University of Andhra Pradesh',city:'Anantapur',type:'Central',estd:2018,rating:4.3,courses:['B.A Hons','B.Sc Hons','M.A','M.Sc','MBA','PhD','Artificial Intelligence & Data Science'],page:'centraluniversityandhrapradesh.html',fees:'₹10,000 – ₹60,000 / yr',intake:2400,accreditation:'UGC'}
  {id:107,state:'Andhra Pradesh',name:'National Sanskrit University',city:'Tirupati',type:'Central',estd:1956,rating:4.4,courses:['Shastri','Acharya','B.Ed','M.Ed','M.A','M.Sc','Diploma','PhD'],page:'nationalsanskrituniversityandhrapradesh.html',fees:'₹3,000 – ₹50,000 / yr',intake:2500,accreditation:'UGC'},
  {id:108,state:'Uttar Pradesh',name:'University of Lucknow',city:'Lucknow',type:'State',estd:1920,rating:4.5,courses:['BTech','MBA','BCA','MCA','LLB','B.Ed','M.A','M.Sc','PhD'],page:'universityoflucknow.html',fees:'₹6,000 – ₹2,50,000 / yr',intake:20000,accreditation:'NAAC A++'},
  {id:109,state:'Delhi',name:'Jawaharlal Nehru University',city:'New Delhi',type:'Central',estd:1969,rating:4.7,courses:['B.A','M.A','M.Sc','MBA','MCA','MPH','PhD','Diploma','Certificate'],page:'jnu.html',fees:'₹300 – ₹50,000 / yr',intake:8000,accreditation:'NAAC A++',isCentral:true},
  {id:110,state:'Delhi',name:'Jamia Millia Islamia',city:'New Delhi',type:'Central',estd:1920,rating:4.6,courses:['BTech','MBA','BBA','B.A','M.A','M.Sc','MCA','LLB','B.Ed','PhD'],page:'jmuuniversity.html',fees:'₹7,000 – ₹2,20,000 / yr',intake:12000,accreditation:'NAAC A++',isCentral:true},
  {id:111,state:'Telangana',name:'University of Hyderabad',city:'Hyderabad',type:'Central',estd:1974,rating:4.6,courses:['M.A','M.Sc','MCA','MBA','MTech','PhD','Integrated M.A','Integrated M.Sc','PG Diploma'],page:'universityofhyderabad.html',fees:'₹5,000 – ₹75,000 / yr',intake:5000,accreditation:'NAAC A++',isCentral:true},
  {id:112,state:'Uttar Pradesh',name:'Dr. A.P.J. Abdul Kalam Technical University',city:'Lucknow',type:'State',estd:2000,rating:4.3,courses:['BTech','MTech','MBA','MCA','BPharma','MPharma','BHMCT','BFAD','B.Arch','PhD'],page:'aktu.html',fees:'₹55,000 – ₹1,20,000 / yr',intake:750000,accreditation:'NAAC A+',isTechnical:true},
  {id:113,state:'Uttar Pradesh',name:'Babasaheb Bhimrao Ambedkar University',city:'Lucknow',type:'Central',estd:1996,rating:4.4,courses:['BTech','MTech','MBA','MCA','BBA','LLB','M.A','M.Sc','B.Ed','PhD'],page:'bbaulucknow.html',fees:'₹8,000 – ₹1,50,000 / yr',intake:7000,accreditation:'NAAC A++',isCentral:true},
  {id:114,state:'Punjab',name:'Guru Angad Dev Veterinary and Animal Sciences University',city:'Ludhiana',type:'State',estd:2005,rating:4.3,courses:['BVSc','MVSc','BTech Dairy Technology','MTech','MBA','Diploma','PhD'],page:'gadvasupunjab.html',fees:'₹25,000 – ₹1,20,000 / yr',intake:2500,accreditation:'ICAR'},
  {id:115,state:'Assam',name:'Tezpur University',city:'Tezpur',type:'Central',estd:1994,rating:4.5,courses:['BTech','MTech','MBA','MCA','MSc','MA','PhD','Diploma'],page:'tezpuruniversity.html',fees:'₹18,000 – ₹1,60,000 / yr',intake:5000,accreditation:'NAAC A+'},
  {id:116,state:'Mizoram',name:'Mizoram University',city:'Aizawl',type:'Central',estd:2001,rating:4.4,courses:['BTech','MTech','MBA','MCA','MSc','MA','BSc','BA','PhD','Diploma'],page:'mizoramuniversity.html',fees:'₹12,000 – ₹1,50,000 / yr',intake:4500,accreditation:'NAAC A'},
  {id:117,state:'Manipur',name:'Manipur University',city:'Imphal',type:'Central',estd:1980,rating:4.3,courses:['BTech','MTech','MBA','MCA','MSc','MA','BSc','BA','PhD','Diploma'],page:'manipuruniversity.html',fees:'₹10,000 – ₹1,40,000 / yr',intake:5500,accreditation:'NAAC A+'},
  {id:118,state:'Nagaland',name:'Nagaland University',city:'Lumami',type:'Central',estd:1994,rating:4.2,courses:['BTech','MTech','MBA','MCA','MSc','MA','BSc','BA','PhD','Diploma'],page:'nagalanduniversity.html',fees:'₹12,000 – ₹1,45,000 / yr',intake:4000,accreditation:'NAAC A'},
  {id:119,state:'Tripura',name:'Tripura University',city:'Agartala',type:'Central',estd:1987,rating:4.3,courses:['BTech','MTech','MBA','MCA','MSc','MA','BSc','BA','PhD','Diploma'],page:'tripurauniversity.html',fees:'₹10,000 – ₹1,50,000 / yr',intake:5000,accreditation:'NAAC A+'},
  {id:120,state:'West Bengal',name:'Visva-Bharati University',city:'Santiniketan',type:'Central',estd:1921,rating:4.5,courses:['BA','BFA','BSc','MA','MSc','MFA','PhD','Diploma'],page:'visvabharatiuniversity.html',fees:'₹8,000 – ₹1,20,000 / yr',intake:6000,accreditation:'NAAC A+'},
  {id:121,state:'Meghalaya',name:'North-Eastern Hill University',city:'Shillong',type:'Central',estd:1973,rating:4.4,courses:['BA','BSc','BTech','MA','MSc','MBA','MCA','MTech','PhD','Diploma'],page:'northeasternhilluniversity.html',fees:'₹10,000 – ₹1,40,000 / yr',intake:7000,accreditation:'NAAC A'},
  {id:122,state:'Telangana',name:'Maulana Azad National Urdu University',city:'Hyderabad',type:'Central',estd:1998,rating:4.3,courses:['BA','BSc','BEd','MA','MSc','MBA','MCA','MTech','PhD','Diploma'],page:'maulanaazadnationalurdu.html',fees:'₹8,000 – ₹1,20,000 / yr',intake:8000,accreditation:'NAAC A+'},
  {id:123,state:'Bihar',name:'AIIMS Darbhanga',city:'Darbhanga',type:'Institute of National Importance',estd:2020,rating:4.4,courses:['MBBS','BSc Nursing','MD','MS','DM','MCh','PhD'],page:'aiimsdarbhanga.html',fees:'₹6,000 – ₹15,000 / yr',intake:125,accreditation:'Institute of National Importance'},
  {id:124,state:'Delhi',name:'Shri Lal Bahadur Shastri National Sanskrit University',city:'New Delhi',type:'Central',estd:1962,rating:4.3,courses:['BA','MA','BEd','MEd','PhD','Diploma','Certificate'],page:'srilalbahadurshastri.html',fees:'₹3,000 – ₹15,000 / yr',intake:1500,accreditation:'NAAC A++'},
  {id:125,state:'Chhattisgarh',name:'Guru Ghasidas Vishwavidyalaya',city:'Bilaspur',type:'Central',estd:1983,rating:4.3,courses:['BTech','MTech','MBA','MCA','BSc','BA','MSc','MA','BCom','MCom','PhD','Diploma'],page:'gurughasidas.html',fees:'₹8,000 – ₹1,20,000 / yr',intake:8000,accreditation:'NAAC A+'},
  {id:126,state:'Uttarakhand',name:'Hemvati Nandan Bahuguna Garhwal University',city:'Srinagar',type:'Central',estd:1973,rating:4.2,courses:['BTech','MTech','MBA','MCA','BSc','BA','MSc','MA','BCom','MCom','PhD','Diploma'],page:'hnbgu.html',fees:'₹8,000 – ₹1,10,000 / yr',intake:7000,accreditation:'NAAC A+'},
  {id:127,state:'Maharashtra',name:'Chhatrapati Shivaji Maharaj University',city:'Navi Mumbai',type:'Private',estd:2018,rating:4.1,courses:['BTech','MBA','MCA','BSc','BA','BCom','MSc','MA','MCom','PhD','Diploma'],page:'csmunavimumbai.html',fees:'₹25,000 – ₹2,50,000 / yr',intake:5000,accreditation:'UGC Approved'},
  {id:128,state:'Madhya Pradesh',name:'Indira Gandhi National Tribal University',city:'Amarkantak',type:'Central',estd:2007,rating:4.3,courses:['BA','BSc','BCom','MA','MSc','MBA','BEd','PhD'],page:'indiragandhinational.html',fees:'₹8,000 – ₹50,000 / yr',intake:5000,accreditation:'NAAC B+'},
  {id:129,state:'Arunachal Pradesh',name:'Rajiv Gandhi University',city:'Itanagar',type:'Central',estd:1984,rating:4.4,courses:['BA','BSc','BCom','BCA','MA','MSc','MBA','MTech','PhD'],page:'rajivgandhiuniversity.html',fees:'₹8,000 – ₹60,000 / yr',intake:8000,accreditation:'NAAC A'},
  {id:130,state:'Assam',name:'Assam University',city:'Silchar',type:'Central',estd:1994,rating:4.3,courses:['BA','BSc','BCom','BTech','MA','MSc','MBA','MCA','PhD'],page:'assamuniversity.html',fees:'₹10,000 – ₹70,000 / yr',intake:6000,accreditation:'NAAC A'},
  {id:131,state:'Puducherry',name:'Pondicherry University',city:'Puducherry',type:'Central',estd:1985,rating:4.4,courses:['BA','BSc','BCom','BTech','MA','MSc','MBA','MCA','PhD'],page:'pondicherryuniversity.html',fees:'₹8,000 – ₹80,000 / yr',intake:10000,accreditation:'NAAC A+'},
  {id:132,state:'Tamil Nadu',name:'Indian Maritime University',city:'Chennai',type:'Central',estd:2008,rating:4.3,courses:['BTech Marine Engineering','BSc Nautical Science','MBA Port & Shipping','MTech','MSc','PhD'],page:'indianmaritimeuniversity.html',fees:'₹50,000 – ₹3,00,000 / yr',intake:4000,accreditation:'NAAC A'},


];

COLLEGES.forEach(c => {
  if (!c.icon) {
    if (c.isIIT)      c.icon = '🔬';
    else if (c.isNIT) c.icon = '🔩';
    else if (c.type === 'Central')                              c.icon = '🏛';
    else if (c.type === 'Government' || c.type === 'Government-Aided') c.icon = '🏢';
    else if (c.type === 'Private')                              c.icon = '🏫';
    else if (c.type === 'Deemed')                               c.icon = '📜';
    else                                                        c.icon = '🎓';
  }
});
 
// ─── Stream-College Matching ──────────────────────────────────
function collegeMatchesStream(college, streamId) {
  if (!streamId) return true;
  const stream = STREAMS.find(s => s.id === streamId);
  if (!stream) return true;
  return college.courses.some(course =>
    stream.keywords.some(kw => course.toLowerCase().includes(kw.toLowerCase()))
  );
}
 
function getStreamMatchingCourses(college, streamId) {
  if (!streamId) return college.courses;
  const stream = STREAMS.find(s => s.id === streamId);
  if (!stream) return college.courses;
  return college.courses.filter(course =>
    stream.keywords.some(kw => course.toLowerCase().includes(kw.toLowerCase()))
  );
}
 
// ─── Distance ────────────────────────────────────────────────
function haversine(lat1, lng1, lat2, lng2) {
  const R    = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a    = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}
 
function getCollegeDistance(college) {
  if (userLat === null) return null;
  const coords = CITY_COORDS[college.city];
  if (!coords) return null;
  return haversine(userLat, userLng, coords[0], coords[1]);
}
 
function getLowestFee(feeStr) {
  const match = feeStr.match(/[\d,]+/);
  if (!match) return 0;
  return parseInt(match[0].replace(/,/g, ''));
}
 
// ─── Auto Suggestions ────────────────────────────────────────
function showAutoSuggestions(val) {
  const box   = document.getElementById('autoSuggestBox');
  const query = val.trim().toLowerCase();
 
  if (!query || query.length < 1) {
    box.style.display = 'none';
    _suggestionIndex  = -1;
    return;
  }
 
  const suggestions = [];
  const seen        = new Set();
 
  COLLEGES.forEach(c => {
    if (c.name.toLowerCase().includes(query) && !seen.has(c.name)) {
      suggestions.push({ label:`${c.icon} ${c.name}`, sub:`${c.city} · ${c.state}`, value:c.name, type:'college' });
      seen.add(c.name);
    }
    if (c.city.toLowerCase().includes(query) && !seen.has('city:'+c.city)) {
      suggestions.push({ label:` ${c.city}`, sub:`City · ${c.state}`, value:c.city, type:'city' });
      seen.add('city:'+c.city);
    }
    c.courses.forEach(co => {
      if (co.toLowerCase().includes(query) && !seen.has('course:'+co)) {
        suggestions.push({ label:`📖 ${co}`, sub:'Course', value:co, type:'course' });
        seen.add('course:'+co);
      }
    });
    if (c.state.toLowerCase().includes(query) && !seen.has('state:'+c.state)) {
      suggestions.push({ label:`🗺️ ${c.state}`, sub:'State', value:c.state, type:'state' });
      seen.add('state:'+c.state);
    }
  });
 
  const top = suggestions.slice(0, 8);
  if (!top.length) { box.style.display = 'none'; return; }
 
  box.innerHTML = top.map((s, i) => `
    <div class="suggest-item" data-index="${i}" data-value="${s.value}" data-type="${s.type}"
      onmousedown="pickSuggestion('${s.value.replace(/'/g,"\\'")}', '${s.type}')"
      onmouseover="highlightSuggestion(${i})"
      style="padding:10px 16px; cursor:pointer; display:flex; align-items:center; justify-content:space-between;
             border-bottom:1px solid #f1f5f9; transition:background .15s;">
      <div>
        <div style="font-size:.9rem; font-weight:600; color:#1e293b;">${s.label}</div>
        <div style="font-size:.75rem; color:#94a3b8; margin-top:1px;">${s.sub}</div>
      </div>
      <span style="font-size:.7rem; color:#cbd5e1; text-transform:uppercase; letter-spacing:.05em;">${s.type}</span>
    </div>
  `).join('');
 
  box.style.display = 'block';
  _suggestionIndex  = -1;
}
 
function highlightSuggestion(idx) {
  _suggestionIndex = idx;
  document.querySelectorAll('.suggest-item').forEach((el, i) => {
    el.style.background = i === idx ? '#f0f9ff' : '';
  });
}
 
function pickSuggestion(value, type) {
  const scrollInput = document.getElementById('scrollSearchInput');
  const mainInput   = document.getElementById('searchInput');
  scrollInput.value = value;
  mainInput.value   = value;
  document.getElementById('autoSuggestBox').style.display = 'none';
  document.getElementById('clearSearchBtn').style.display = value ? '' : 'none';
  const stateMatch = ['Punjab','Haryana','Uttar Pradesh','Bihar'].find(
    s => s.toLowerCase() === value.toLowerCase()
  );
  if (type === 'state' && stateMatch) {
    currentState = stateMatch;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    const stateTab = document.querySelector(`.tab[data-state="${stateMatch}"]`);
    if (stateTab) stateTab.classList.add('active');
    document.getElementById('activeStateLabel').textContent = stateMatch;
  }
  filterColleges();
  jumpToSection('all-section');
}
 
function handleSuggestionKey(e) {
  const box   = document.getElementById('autoSuggestBox');
  const items = box.querySelectorAll('.suggest-item');
  if (!items.length || box.style.display === 'none') return;
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    _suggestionIndex = Math.min(_suggestionIndex + 1, items.length - 1);
    items.forEach((el, i) => el.style.background = i === _suggestionIndex ? '#f0f9ff' : '');
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    _suggestionIndex = Math.max(_suggestionIndex - 1, 0);
    items.forEach((el, i) => el.style.background = i === _suggestionIndex ? '#f0f9ff' : '');
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (_suggestionIndex >= 0 && items[_suggestionIndex]) {
      pickSuggestion(items[_suggestionIndex].dataset.value, items[_suggestionIndex].dataset.type);
    } else {
      const val = document.getElementById('scrollSearchInput').value;
      document.getElementById('searchInput').value = val;
      box.style.display = 'none';
      filterColleges();
      jumpToSection('all-section');
    }
  } else if (e.key === 'Escape') {
    box.style.display = 'none';
  }
}
 
function toggleClearBtn(val) {
  document.getElementById('clearSearchBtn').style.display = val ? '' : 'none';
}
 
function clearAutoSearch() {
  document.getElementById('scrollSearchInput').value  = '';
  document.getElementById('searchInput').value        = '';
  document.getElementById('clearSearchBtn').style.display = 'none';
  document.getElementById('autoSuggestBox').style.display = 'none';
  filterColleges();
}
 
document.addEventListener('click', e => {
  const box   = document.getElementById('autoSuggestBox');
  const input = document.getElementById('scrollSearchInput');
  if (box && input && !box.contains(e.target) && e.target !== input)
    box.style.display = 'none';
});
 
// ─── Render Stream Cards ──────────────────────────────────────
function renderStreamCards() {
  const grid = document.getElementById('streamGrid');
  grid.innerHTML = STREAMS.map((s, i) => {
    const count = COLLEGES.filter(c => collegeMatchesStream(c, s.id)).length;
    return `
    <div class="stream-card" data-stream="${s.id}" onclick="selectStream('${s.id}', this)"
         style="animation-delay:${i * 50}ms">
      <div class="sc-icon-wrap">
        <span>${s.icon}</span>
        <div class="sc-check">✓</div>
      </div>
      <div class="sc-name">${s.name}</div>
      <div class="sc-desc">${s.desc}</div>
      <div class="sc-count">${count} universities</div>
    </div>`;
  }).join('');
}
 
function selectStream(id, el) {
  document.querySelectorAll('.stream-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  currentStream = id;
  document.getElementById('continueBtn').disabled = false;
}
 
// ─── Geolocation (nearbyBar version used by initGeolocation) ──
function initGeolocation() {
  // The navLocationTag button (left side of filter bar) handles geolocation.
  // Reset its state each time the main page loads.
  const locIcon = document.getElementById('navLocIcon');
  const locText = document.getElementById('navLocText');
  const tag     = document.getElementById('navLocationTag');
  if (locIcon) locIcon.textContent = '';
  if (locText) locText.textContent = 'Detect Location';
  if (tag) {
    tag.style.borderColor = '#e2e8f0';
    tag.style.background  = '#fff';
    tag.style.color       = '#334155';
  }
}
 
function toggleNearby() {
  showingNearby = !showingNearby;
  const btn  = document.getElementById('nearbyBtn');
  const pill = document.getElementById('nearbyPill');
  const tag  = document.getElementById('navLocationTag');
  const locText = document.getElementById('navLocText');

  if (showingNearby) {
    if (btn)  btn.textContent = 'Clear Nearby Filter';
    if (pill) pill.classList.remove('hidden');
    document.getElementById('sortSelect').value = 'distance';
    if (tag) { tag.style.background = '#ecfdf5'; tag.style.borderColor = '#10b981'; }
  } else {
    if (btn)  btn.textContent = 'Show Nearby Colleges';
    if (pill) pill.classList.add('hidden');
    if (tag) { tag.style.background = '#fff'; tag.style.borderColor = '#e2e8f0'; }
    // restore location text
    if (locText && userLat !== null) {
      const city = findNearestCity(userLat, userLng);
      locText.textContent = city ? `Near ${city}` : 'Location set';
    }
  }
  filterColleges();
}
 
function closeNearbyBar() {
  document.getElementById('nearbyBar').classList.add('hidden');
  if (showingNearby) { showingNearby = false; filterColleges(); }
}
 
// ─── Helpers ─────────────────────────────────────────────────
function getStars(r) {
  const full  = Math.floor(r);
  const half  = r % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}
function stateTagClass(s) {
return {
  AndhraPradesh:'tag-AndhraPradesh',
  ArunachalPradesh:'tag-ArunachalPradesh',
  Assam:'tag-Assam',
  Bihar:'tag-Bihar',
  Chhattisgarh:'tag-Chhattisgarh',
  Goa:'tag-Goa',
  Gujarat:'tag-Gujarat',
  Haryana:'tag-Haryana',
  HimachalPradesh:'tag-HimachalPradesh',
  Jharkhand:'tag-Jharkhand',
  Karnataka:'tag-Karnataka',
  Kerala:'tag-Kerala',
  MadhyaPradesh:'tag-MadhyaPradesh',
  Maharashtra:'tag-Maharashtra',
  Manipur:'tag-Manipur',
  Meghalaya:'tag-Meghalaya',
  Mizoram:'tag-Mizoram',
  Nagaland:'tag-Nagaland',
  Odisha:'tag-Odisha',
  Punjab:'tag-Punjab',
  Rajasthan:'tag-Rajasthan',
  Sikkim:'tag-Sikkim',
  TamilNadu:'tag-TamilNadu',
  Telangana:'tag-Telangana',
  Tripura:'tag-Tripura',
  UttarPradesh:'tag-UttarPradesh',
  Uttarakhand:'tag-Uttarakhand',
  WestBengal:'tag-WestBengal',

  // Union Territories
  AndamanNicobar:'tag-AndamanNicobar',
  Chandigarh:'tag-Chandigarh',
  DadraNagarHaveliDamanDiu:'tag-DadraNagarHaveliDamanDiu',
  Delhi:'tag-Delhi',
  Jammu:'tag-Jammu',
  Kashmir:'tag-Kashmir',
  Ladakh:'tag-Ladakh',
  Lakshadweep:'tag-Lakshadweep',
  Puducherry:'tag-Puducherry'
}[s] || '';
}
 
// ─── Section Jump ─────────────────────────────────────────────
function jumpToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  const navbar    = document.querySelector('.navbar');
  const scrollBar = document.getElementById('scrollFilterBar');
  const offset = (navbar ? navbar.offsetHeight : 64) +
    (scrollBar && scrollBar.classList.contains('visible') ? scrollBar.offsetHeight : 0);
  const top = el.getBoundingClientRect().top + window.pageYOffset - offset - 8;
  window.scrollTo({ top, behavior:'smooth' });
}
 
// ─── Scroll Filter Bar visibility ────────────────────────────
window.addEventListener('scroll', () => {
  const bar  = document.getElementById('scrollFilterBar');
  const hero = document.querySelector('.hero-banner');
  if (!bar || !hero) return;
  bar.classList.toggle('visible', hero.getBoundingClientRect().bottom < 64);
});
 
// ─── Scroll Filter Bar type buttons ──────────────────────────
function scrollFilterByType(btn, type) {
  _scrollTypeFilter = type;
  document.querySelectorAll('.scroll-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('searchInput').value        = '';
  document.getElementById('scrollSearchInput').value  = '';
  document.getElementById('autoSuggestBox').style.display = 'none';
  filterColleges();
  jumpToSection('all-section');
}
 
// ─── Render IIT / NIT Sections ────────────────────────────────
function renderIITSection() {
  const iits = COLLEGES.filter(c => c.isIIT);
  document.getElementById('iitCount').textContent = iits.length;
  document.getElementById('iitGrid').innerHTML    = iits.map((c, i) => renderInstCard(c, 'iit', i)).join('');
}
 
function renderNITSection() {
  const nits = COLLEGES.filter(c => c.isNIT);
  document.getElementById('nitCount').textContent = nits.length;
  document.getElementById('nitGrid').innerHTML    = nits.map((c, i) => renderInstCard(c, 'nit', i)).join('');
}
 
function renderInstCard(c, kind, i) {
  const label      = kind === 'iit' ? 'IIT' : 'NIT';
  const dist       = getCollegeDistance(c);
  const distText   = dist !== null ? ` &nbsp;·&nbsp; ${Math.round(dist)} km` : '';
  const showCourses = c.courses.slice(0, 5);
  return `
  <div class="inst-card ${kind}-card" style="animation-delay:${i * 60}ms">
    <div class="inst-card-head">
      <div class="inst-badge">${c.icon} ${label}</div>
      <h4>${c.name}</h4>
      <div class="inst-city">${c.city}, ${c.state} · Est. ${c.estd}${distText}</div>
    </div>
    <div class="inst-card-body">
      <div class="inst-meta">
        <span class="inst-meta-pill">📋 ${c.accreditation}</span>
        <span class="inst-meta-pill">👥 ${c.intake.toLocaleString()} intake</span>
        <span class="inst-meta-pill">💰 ${c.fees}</span>
      </div>
      <div class="inst-rating">
        <span class="stars">${getStars(c.rating)}</span>
        <span>${c.rating}/5</span>
      </div>
      <div class="inst-courses">
        ${showCourses.map(co => `<span class="inst-course-tag">${co}</span>`).join('')}
        ${c.courses.length > 5 ? `<span class="inst-course-tag">+${c.courses.length - 5} more</span>` : ''}
      </div>
    </div>
    <div class="inst-card-foot">
      <button class="btn-detail" onclick="showDetail(${c.id})">View Details</button>
      <button class="btn-shortlist ${shortlistIds.has(c.id) ? 'active' : ''}"
        id="sl-btn-inst-${c.id}" onclick="toggleShortlistInst(${c.id})">
        ${shortlistIds.has(c.id) ? '⭐ Saved' : '☆ Save'}
      </button>
    </div>
  </div>`;
}
 
function toggleShortlistInst(id) {
  shortlistIds.has(id) ? shortlistIds.delete(id) : shortlistIds.add(id);
  document.getElementById('shortlistCount').textContent = shortlistIds.size;
  ['sl-btn-' + id, 'sl-btn-inst-' + id].forEach(btnId => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.classList.toggle('active', shortlistIds.has(id));
      btn.textContent = shortlistIds.has(id) ? '⭐ Saved' : '☆ Save';
    }
  });
}
 
// ─── Render Colleges ──────────────────────────────────────────
function renderColleges(list) {
  const grid = document.getElementById('collegeGrid');
  document.getElementById('resultCount').textContent =
    `Showing ${list.length} universit${list.length === 1 ? 'y' : 'ies'}`;
 
  const query      = document.getElementById('searchInput').value.trim();
  const hasFilters = currentState !== 'all' || currentStream || showingNearby ||
    query || _scrollTypeFilter !== 'all';
  document.getElementById('clearFiltersBtn').style.display = hasFilters ? '' : 'none';
 
  if (!list.length) {
    grid.innerHTML = `<div class="no-results"><div class="emoji">🔎</div>
      <h4>No universities found</h4><p>Try adjusting your search or filters</p></div>`;
    return;
  }
 
  grid.innerHTML = list.map((c, idx) => {
    const dist         = getCollegeDistance(c);
    const matchCourses = getStreamMatchingCourses(c, currentStream);
    const allCourses   = matchCourses.length ? matchCourses : c.courses;
    const showCourses  = allCourses.slice(0, 4);
    const extras       = allCourses.length > 4
      ? `<span class="card-tag">+${allCourses.length - 4} more</span>` : '';
    const distBadge    = dist !== null
      ? `<span class="distance-badge">${dist < 1 ? '<1' : Math.round(dist)} km</span>` : '';
 
    return `
    <div class="college-card" style="animation-delay:${idx * 25}ms">
      <div class="card-header">
        <div class="card-badges">
          <span class="card-state-tag ${stateTagClass(c.state)}">${c.state}</span>
          ${distBadge}
        </div>
        <span class="card-rank">#${c.id}</span>
        <h4>${c.icon} ${c.name}</h4>
        <p class="card-city">${c.city} &nbsp;·&nbsp; Est. ${c.estd}</p>
      </div>
      <div class="card-body">
        <div class="card-meta">
          <div class="meta-item"><span class="meta-label">Type</span><span class="meta-value">${c.type}</span></div>
          <div class="meta-item"><span class="meta-label">Intake</span><span class="meta-value">${c.intake.toLocaleString()}</span></div>
          <div class="meta-item"><span class="meta-label">Fees</span><span class="meta-value" style="font-size:.78rem">${c.fees}</span></div>
          <div class="meta-item"><span class="meta-label">Accreditation</span><span class="meta-value">${c.accreditation}</span></div>
        </div>
        <div class="card-rating">
          <span class="stars">${getStars(c.rating)}</span>
          <span class="rating-num">${c.rating} / 5</span>
        </div>
        <div class="card-tags">
          ${showCourses.map(co => {
            const isMatch = currentStream && getStreamMatchingCourses(c, currentStream).includes(co);
            return `<span class="card-tag" style="${isMatch ? 'background:#fff8e0;color:#92400e;font-weight:600;border:1px solid #fde68a' : ''}">${co}</span>`;
          }).join('')}
          ${extras}
        </div>
      </div>
      <div class="card-footer">
        <button class="btn-detail" onclick="showDetail(${c.id})">View Details</button>
        <button class="btn-shortlist ${shortlistIds.has(c.id) ? 'active' : ''}"
          id="sl-btn-${c.id}" onclick="toggleShortlist(${c.id})">
          ${shortlistIds.has(c.id) ? '⭐ Saved' : '☆ Save'}
        </button>
      </div>
    </div>`;
  }).join('');
}
 
// ─── Filter & Sort ────────────────────────────────────────────
function filterColleges() {
  const scrollVal = document.getElementById('scrollSearchInput').value;
  document.getElementById('searchInput').value = scrollVal;
  const query = scrollVal.toLowerCase().trim();
  const sort  = document.getElementById('sortSelect').value;
 
  let list = COLLEGES.filter(c => {
    const matchState  = currentState === 'all' || c.state === currentState;
    const matchStream = !currentStream || collegeMatchesStream(c, currentStream);
    let matchType     = true;
    if      (_scrollTypeFilter === 'iit')        matchType = !!c.isIIT;
    else if (_scrollTypeFilter === 'nit')        matchType = !!c.isNIT;
    else if (_scrollTypeFilter === 'central')    matchType = c.type === 'Central';
    else if (_scrollTypeFilter === 'government') matchType = c.type === 'Government' || c.type === 'Government-Aided';
    else if (_scrollTypeFilter === 'private')    matchType = c.type === 'Private';
    else if (_scrollTypeFilter === 'deemed')     matchType = c.type === 'Deemed';
    const matchQuery = !query ||
      c.name.toLowerCase().includes(query) ||
      c.city.toLowerCase().includes(query) ||
      c.type.toLowerCase().includes(query) ||
      c.state.toLowerCase().includes(query) ||
      c.accreditation.toLowerCase().includes(query) ||
      c.courses.some(co => co.toLowerCase().includes(query));
    const matchNearby = !showingNearby ||
      (getCollegeDistance(c) !== null && getCollegeDistance(c) <= 200);
    return matchState && matchStream && matchQuery && matchNearby && matchType;
  });
 
  if (sort === 'az')        list.sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === 'za')   list.sort((a, b) => b.name.localeCompare(a.name));
  else if (sort === 'rating')   list.sort((a, b) => b.rating - a.rating);
  else if (sort === 'distance' && userLat !== null)
    list.sort((a, b) => (getCollegeDistance(a) ?? 9999) - (getCollegeDistance(b) ?? 9999));
  else if (sort === 'fees_low')
    list.sort((a, b) => getLowestFee(a.fees) - getLowestFee(b.fees));
 
  renderColleges(list);
}
 
function filterByState(btn, state) {
  currentState = state;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('activeStateLabel').textContent = state === 'all' ? 'All States' : state;
  filterColleges();
}
 
function clearAllFilters() {
  currentState      = 'all';
  currentStream     = null;
  showingNearby     = false;
  _scrollTypeFilter = 'all';
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelector('.tab[data-state="all"]').classList.add('active');
  document.querySelectorAll('.scroll-tab').forEach(t => t.classList.remove('active'));
  document.querySelector('.scroll-tab[data-type="all"]').classList.add('active');
  document.getElementById('activeStateLabel').textContent     = 'All States';
  document.getElementById('searchInput').value                = '';
  document.getElementById('scrollSearchInput').value          = '';
  document.getElementById('autoSuggestBox').style.display     = 'none';
  document.getElementById('clearSearchBtn').style.display     = 'none';
  document.getElementById('sortSelect').value                  = 'default';
  document.getElementById('nearbyPill').classList.add('hidden');
  document.getElementById('heroStreamPill').style.display     = 'none';
  document.getElementById('navStreamBadge').style.display     = 'none';
  document.getElementById('heroBannerDesc').textContent =
    'Browse 100 universities across 4 states — filter, compare, and shortlist your top choices';
  // Reset location button visual if not detected yet
  if (!geoRequested) {
    const locIcon = document.getElementById('navLocIcon');
    const locText = document.getElementById('navLocText');
    const tag     = document.getElementById('navLocationTag');
    if (locIcon) locIcon.textContent = '';
    if (locText) locText.textContent = 'Detect Location';
    if (tag)    { tag.style.borderColor = '#e2e8f0'; tag.style.background = '#fff'; tag.style.color = '#334155'; }
  }
  filterColleges();
}
 
// ─── Shortlist ────────────────────────────────────────────────
function toggleShortlist(id) {
  shortlistIds.has(id) ? shortlistIds.delete(id) : shortlistIds.add(id);
  document.getElementById('shortlistCount').textContent = shortlistIds.size;
  ['sl-btn-' + id, 'sl-btn-inst-' + id].forEach(btnId => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.classList.toggle('active', shortlistIds.has(id));
      btn.textContent = shortlistIds.has(id) ? '⭐ Saved' : '☆ Save';
    }
  });
}
 
function showShortlist() {
  const modal = document.getElementById('shortlistModal');
  const body  = document.getElementById('shortlistBody');
  modal.classList.remove('hidden');
  if (!shortlistIds.size) {
    body.innerHTML = "<p class='empty-msg'>You haven't shortlisted any universities yet.</p>";
    return;
  }
  body.innerHTML = [...shortlistIds].map(id => {
    const c = COLLEGES.find(x => x.id === id);
    return `<div class="shortlist-item">
      <div><div class="si-name">${c.icon} ${c.name}</div><div class="si-state">${c.city} · ${c.state}</div></div>
      <button onclick="toggleShortlist(${c.id});showShortlist()">🗑</button>
    </div>`;
  }).join('');
}
function closeShortlist() { document.getElementById('shortlistModal').classList.add('hidden'); }
function clearShortlist() { shortlistIds.clear(); document.getElementById('shortlistCount').textContent = 0; filterColleges(); closeShortlist(); }
function applyAll() { alert(`✅ Application submitted for ${shortlistIds.size} university/universities!\nOur counsellor will contact you within 24 hours.`); }
 
// ─── Detail Modal ─────────────────────────────────────────────
function showDetail(id) {
  const c = COLLEGES.find(x => x.id === id);
  if (c.page) { window.location.href = c.page; return; }
  const dist           = getCollegeDistance(c);
  const streamMatching = getStreamMatchingCourses(c, currentStream);
  document.getElementById('detailTitle').textContent = `${c.icon} ${c.name}`;
  document.getElementById('detailBody').innerHTML = `
    <div class="detail-header-info">
      <div class="detail-badge" style="background:var(--gray-100)">${c.icon}</div>
      <div class="detail-info">
        <h3>${c.name}</h3>
        <p>${c.city}, ${c.state} &nbsp;·&nbsp; Est. ${c.estd}
          ${dist !== null ? `&nbsp;·&nbsp; ${Math.round(dist)} km from you` : ''}</p>
      </div>
    </div>
    <div class="detail-grid">
      <div class="detail-row"><div class="dr-label">University Type</div><div class="dr-value">${c.type}</div></div>
      <div class="detail-row"><div class="dr-label">Rating</div><div class="dr-value">${getStars(c.rating)} (${c.rating}/5)</div></div>
      <div class="detail-row"><div class="dr-label">Annual Fees</div><div class="dr-value">${c.fees}</div></div>
      <div class="detail-row"><div class="dr-label">Total Intake</div><div class="dr-value">${c.intake.toLocaleString()} students</div></div>
      <div class="detail-row"><div class="dr-label">Accreditation</div><div class="dr-value">${c.accreditation}</div></div>
      <div class="detail-row"><div class="dr-label">State</div><div class="dr-value">${c.state}</div></div>
    </div>
    ${currentStream && streamMatching.length ? `
    <div class="detail-courses" style="margin-bottom:16px">
      <h4>✅ Matching Your Stream (${STREAMS.find(s => s.id === currentStream)?.name})</h4>
      <div class="course-chips">${streamMatching.map(co => `<span class="course-chip highlight-chip">${co}</span>`).join('')}</div>
    </div>` : ''}
    <div class="detail-courses">
      <h4>All Available Courses</h4>
      <div class="course-chips">${c.courses.map(co => `<span class="course-chip">${co}</span>`).join('')}</div>
    </div>
    <div style="margin-top:20px;display:flex;gap:10px">
      <button class="btn-apply" style="flex:1" onclick="toggleShortlist(${c.id});closeDetail();showShortlist()">
        ${shortlistIds.has(c.id) ? '⭐ Already Shortlisted' : '☆ Add to Shortlist'}
      </button>
    </div>`;
  document.getElementById('detailModal').classList.remove('hidden');
}
function closeDetail() { document.getElementById('detailModal').classList.add('hidden'); }
 
// ─── Auth ─────────────────────────────────────────────────────
function togglePassword() {
  const pw = document.getElementById('loginPassword');
  pw.type  = pw.type === 'password' ? 'text' : 'password';
}
function showAlert(msg, type = 'error') {
  const el = document.getElementById('loginAlert');
  el.className = `alert ${type}`;
  el.textContent = msg;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 4000);
}
function handleLogin() {
  const name  = document.getElementById('loginName').value.trim();
  const email = document.getElementById('loginEmail').value.trim();
  const pw    = document.getElementById('loginPassword').value;
  if (!name)  return showAlert('Please enter your full name.');
  if (!email) return showAlert('Please enter your email address.');
  if (!pw)    return showAlert('Please enter your password.');
  if (!email.includes('@')) return showAlert('Please enter a valid email address.');
  if (pw.length < 4) return showAlert('Password must be at least 4 characters.');
  showAlert('Signing in…', 'success');
  setTimeout(() => goToStreamPage(name), 900);
}
function handleDemoLogin() { goToStreamPage('Demo Student'); }
 
function goToStreamPage(name) {
  if (name) currentUser = name;
  document.getElementById('loginPage').classList.remove('active');
  document.getElementById('mainPage').classList.remove('active');
  document.getElementById('streamPage').classList.add('active');
  currentStream = null;
  document.getElementById('continueBtn').disabled = true;
  document.querySelectorAll('.stream-card').forEach(c => c.classList.remove('selected'));
  renderStreamCards();
}
 
function proceedToMain(skipStream) {
  if (skipStream) currentStream = null;
  const stream = STREAMS.find(s => s.id === currentStream);
  document.getElementById('navWelcome').textContent = `Welcome, ${currentUser}`;
  if (stream) {
    document.getElementById('navStreamBadge').textContent  = `${stream.icon} ${stream.name}`;
    document.getElementById('navStreamBadge').style.display = 'flex';
    document.getElementById('heroStreamName').textContent   = stream.name;
    document.getElementById('heroStreamPill').style.display = 'inline-flex';
    document.getElementById('heroBannerDesc').textContent   =
      `Showing universities offering ${stream.name} programs across 4 states`;
  } else {
    document.getElementById('navStreamBadge').style.display = 'none';
    document.getElementById('heroStreamPill').style.display = 'none';
    document.getElementById('heroBannerDesc').textContent   =
      'Browse all universities across India — filter, compare, and shortlist your top choices';
  }
  document.getElementById('streamPage').classList.remove('active');
  document.getElementById('mainPage').classList.add('active');
  currentState      = 'all';
  _scrollTypeFilter = 'all';
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelector('.tab[data-state="all"]').classList.add('active');
  document.getElementById('activeStateLabel').textContent = 'All States';
  document.getElementById('searchInput').value       = '';
  document.getElementById('scrollSearchInput').value = '';
  document.getElementById('sortSelect').value = currentStream ? 'rating' : 'default';
  renderIITSection();
  renderNITSection();
  filterColleges();
  initGeolocation();
}
 
function handleLogout() {
  if (!confirm('Are you sure you want to logout?')) return;
  currentUser = null; currentStream = null; currentState = 'all';
  shortlistIds.clear(); showingNearby = false;
  userLat = null; userLng = null; geoRequested = false; _scrollTypeFilter = 'all';
  document.getElementById('shortlistCount').textContent = 0;
  document.getElementById('mainPage').classList.remove('active');
  document.getElementById('streamPage').classList.remove('active');
  document.getElementById('loginPage').classList.add('active');
  document.getElementById('loginName').value     = '';
  document.getElementById('loginEmail').value    = '';
  document.getElementById('loginPassword').value = '';
  document.getElementById('nearbyBar').classList.add('hidden');
  document.getElementById('scrollFilterBar').classList.remove('visible');
}
 
function showRegister() { showAlert('Registration coming soon! Use Demo Login to explore.', 'success'); }
 
// ─── Feedback ─────────────────────────────────────────────────
const STAR_LABELS = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
 
function hoverRating(val) {
  document.querySelectorAll('#starRating .star').forEach(s => {
    s.classList.toggle('hovered', parseInt(s.dataset.val) <= val);
    s.classList.remove('selected');
  });
  document.getElementById('starLabel').textContent = STAR_LABELS[val];
}
function unhoverRating() {
  document.querySelectorAll('#starRating .star').forEach(s => {
    s.classList.remove('hovered');
    s.classList.toggle('selected', parseInt(s.dataset.val) <= fbRating);
  });
  document.getElementById('starLabel').textContent = fbRating > 0 ? STAR_LABELS[fbRating] : 'Click to rate';
}
function setRating(val) {
  fbRating = val;
  document.querySelectorAll('#starRating .star').forEach(s => {
    s.classList.toggle('selected', parseInt(s.dataset.val) <= val);
    s.classList.remove('hovered');
  });
  document.getElementById('starLabel').textContent = STAR_LABELS[val];
}
function toggleChip(el) { el.classList.toggle('selected'); }
function setRecommend(val) {
  fbRecommend = val;
  document.getElementById('fbRecYes').className   = 'fb-rec-btn' + (val === 'yes'   ? ' selected-yes'   : '');
  document.getElementById('fbRecMaybe').className = 'fb-rec-btn' + (val === 'maybe' ? ' selected-maybe' : '');
  document.getElementById('fbRecNo').className    = 'fb-rec-btn' + (val === 'no'    ? ' selected-no'    : '');
}
function submitFeedback() {
  const name  = document.getElementById('fbName').value.trim();
  const errEl = document.getElementById('fbError');
  if (!name || fbRating === 0) {
    errEl.classList.remove('hidden');
    errEl.scrollIntoView({ behavior:'smooth', block:'center' });
    return;
  }
  errEl.classList.add('hidden');
  document.getElementById('feedbackFormBody').style.display = 'none';
  document.getElementById('feedbackSuccess').classList.remove('hidden');
}
function resetFeedback() {
  fbRating = 0; fbRecommend = null;
  document.getElementById('fbName').value    = '';
  document.getElementById('fbEmail').value   = '';
  document.getElementById('fbMessage').value = '';
  document.querySelectorAll('#starRating .star').forEach(s => s.classList.remove('selected','hovered'));
  document.getElementById('starLabel').textContent = 'Click to rate';
  document.querySelectorAll('#fbLikeChips .fb-chip').forEach(c => c.classList.remove('selected'));
  setRecommend(null);
  document.getElementById('fbError').classList.add('hidden');
  document.getElementById('feedbackFormBody').style.display = '';
  document.getElementById('feedbackSuccess').classList.add('hidden');
}
 
// ─── Modal close ─────────────────────────────────────────────
document.getElementById('shortlistModal').addEventListener('click', function(e) { if (e.target === this) closeShortlist(); });
document.getElementById('detailModal').addEventListener('click', function(e)    { if (e.target === this) closeDetail(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeShortlist(); closeDetail(); }
});