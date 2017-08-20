class Api::V1::MeetingsController < ApplicationController
  def index
    @meetings = Meeting.all
    render "index.json.jbuilder"
  end

  def show
    @meeting = Meeting.find_by(id: params[:id])
    render "show.json.jbuilder"
  end
end
