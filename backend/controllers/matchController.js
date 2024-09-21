exports.getMatchingMentors = async (req, res) => {
    try {
      const menteeId = req.user._id;
      const mentee = await MenteeProfile.findOne({ user: menteeId });
  
      if (!mentee) {
        return res.status(404).json({ message: 'Mentee profile not found' });
      }
  
      const matchingMentors = await MentorProfile.find({
        subjectExpertise: { $in: mentee.interestedSubjects }
      }).select('name subjectExpertise teachingLanguage highestDegree institute bio achievements');
  
      res.status(200).json(matchingMentors);
    } catch (error) {
      res.status(500).json({ message: 'Error finding matching mentors', error: error.message });
    }
  };