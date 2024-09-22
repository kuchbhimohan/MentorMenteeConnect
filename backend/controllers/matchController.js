const MenteeProfile = require('../models/MenteeProfile');
const MentorProfile = require('../models/MentorProfile');
exports.getMatchingMentors = async (req, res) => {
  try {
    const menteeId = req.user._id;
    console.log('Fetching matching mentors for mentee ID:', menteeId);

    const mentee = await MenteeProfile.findOne({ user: menteeId });
    if (!mentee) {
      console.log('Mentee profile not found for ID:', menteeId);
      return res.status(404).json({ message: 'Mentee profile not found' });
    }

    console.log('Found mentee profile:', mentee);

    const matchingMentors = await MentorProfile.find({
      subjectExpertise: { $in: mentee.interestedSubjects }
    }).select('name subjectExpertise teachingLanguage highestDegree institute bio achievements');

    console.log(`Found ${matchingMentors.length} matching mentors`);

    res.status(200).json(matchingMentors);
  } catch (error) {
    console.error('Error in getMatchingMentors:', error);
    res.status(500).json({ message: 'Error finding matching mentors', error: error.message });
  }
};