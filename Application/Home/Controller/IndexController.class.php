<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
        $Temperature = D('Temperature');
        $roomData = $Temperature->where("type='room'")->order('time asc')->select();

        $this->assign('roomCurrent',$roomData[count($roomData)-1]['value']);
        $this->assign('roomValue',json_encode($roomData));
        $this->display();
    }
}