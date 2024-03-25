const EditProfileForm = ({ firstname, lastname, jobtitle, company, sc }) => {
  return (
    <form className="flex flex-col m-auto gap-4 py-10 px-5 max-w-[500px]">
      <div>
        <label
          htmlFor="firstname"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          First name
        </label>
        <input
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type="text"
          id="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          placeholder={firstname}
          required
        />
      </div>

      <div>
        <label
          htmlFor="lastname"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Last name
        </label>
        <input
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type="text"
          id="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          placeholder={lastname}
          required
        />
      </div>

      <div>
        <label
          htmlFor="jobtitle"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Job Title
        </label>
        <input
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type="text"
          id="jobtitle"
          value={jobtitle}
          onChange={(e) => setJobtitle(e.target.value)}
          placeholder={jobtitle}
          required
        />
      </div>
      <div>
        <label
          htmlFor="company"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Company
        </label>
        <input
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type="text"
          id="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder={company}
          required
        />
      </div>

      <div>
        <label
          htmlFor="school"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your school
        </label>
        <input
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type="text"
          id="school"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          placeholder={school}
          required
        />
      </div>
      <div>
        <label
          htmlFor="city"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          City
        </label>
        <input
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder={city}
          required
        />
      </div>
      <div>
        <label
          htmlFor="province"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Province
        </label>
        <input
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type="text"
          id="province"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          placeholder={province}
          required
        />
      </div>
      <div>
        <label
          htmlFor="country"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Country
        </label>
        <input
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type="text"
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder={country}
          required
        />
      </div>

      <div>
        <label
          htmlFor="program"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Program
        </label>
        <input
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type="text"
          id="program"
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          placeholder={program}
          required
        />
      </div>
      <div>
        <label
          htmlFor="looking"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          What are you looking for?
        </label>
        <select
          id="looking"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={looking}
          onChange={(e) => setLooking(e.target.value)}
          required
        >
          <option value="">Please select an option</option>
          <option value="mentor">Mentor</option>
          <option value="mentee">Mentee</option>
          <option value="not looking">Not Looking</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="bio"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Bio
        </label>
        <textarea
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={bio}
          id="bio"
          onChange={(e) => setBio(e.target.value)}
          placeholder={bio}
          required
        />
      </div>
      <button
        type="submit"
        className="mb-6 text-white bg-mentorlink-black hover:bg-[#333] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
      >
        Submit
      </button>
    </form>
  );
};

export default EditProfileForm;
